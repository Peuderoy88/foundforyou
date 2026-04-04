/**
 * AI Service for Claude and Stable Diffusion Integration
 * Handles text generation and image generation for product creation
 */

import Anthropic from '@anthropic-ai/sdk'

interface DesignPromptData {
  productType: string
  style: string
  description: string
  colorPalette: string
  additionalNotes?: string
}

interface GeneratedDesign {
  imagePrompt: string
  productDescription: string
  designTags: string[]
}

/**
 * Generate a detailed image prompt from user input using Claude
 */
export async function generateDesignPrompt(data: DesignPromptData): Promise<GeneratedDesign> {
  const client = new Anthropic()

  const userMessage = `
You are a creative AI designer assistant. A user wants to create a custom ${data.productType} with the following details:

Style: ${data.style}
Description: ${data.description}
Color Palette: ${data.colorPalette}
${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}` : ''}

Please generate:
1. A detailed image prompt for Stable Diffusion (for generating the design image)
2. A catchy product description (2-3 sentences)
3. Design tags (5-7 relevant tags for categorization)

Format your response as JSON with keys: imagePrompt, productDescription, designTags
`

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  // Extract the text content from the response
  const responseText =
    message.content[0].type === 'text' ? message.content[0].text : ''

  // Parse the JSON response
  try {
    // Find JSON in the response (it might be wrapped in markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    return {
      imagePrompt: parsedResponse.imagePrompt,
      productDescription: parsedResponse.productDescription,
      designTags: Array.isArray(parsedResponse.designTags)
        ? parsedResponse.designTags
        : parsedResponse.designTags.split(',').map((tag: string) => tag.trim()),
    }
  } catch (error) {
    console.error('Failed to parse Claude response:', error)
    // Fallback response
    return {
      imagePrompt: `${data.style} ${data.productType} design inspired by: ${data.description}`,
      productDescription: data.description.substring(0, 150) + '...',
      designTags: [data.style, data.productType, data.colorPalette],
    }
  }
}

/**
 * Generate an image using Stable Diffusion via Replicate API
 */
export async function generateDesignImage(imagePrompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version: '39ed52f2a60c3b36b96d4bcea2d9de62b8c9d038efdd4b210257594df4dbd4f9',
        input: {
          prompt: imagePrompt,
          num_inference_steps: 50,
          guidance_scale: 7.5,
          scheduler: 'DPMSolverMultistepScheduler',
          seed: Math.floor(Math.random() * 1000000),
        },
      }),
    })

    const prediction = await response.json()

    if (!response.ok) {
      throw new Error(`Replicate API error: ${prediction.detail}`)
    }

    // Poll for the result
    return pollPredictionResult(prediction.id)
  } catch (error) {
    console.error('Failed to generate image:', error)
    throw error
  }
}

/**
 * Poll Replicate API for prediction results
 */
async function pollPredictionResult(
  predictionId: string,
  maxAttempts: number = 120,
  delayMs: number = 5000,
): Promise<string> {
  let attempts = 0

  while (attempts < maxAttempts) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    })

    const prediction = await response.json()

    if (prediction.status === 'succeeded') {
      // Stable Diffusion returns output as array of URLs
      if (Array.isArray(prediction.output) && prediction.output.length > 0) {
        return prediction.output[0]
      }
      throw new Error('No image output from Stable Diffusion')
    }

    if (prediction.status === 'failed') {
      throw new Error(`Image generation failed: ${prediction.error}`)
    }

    // Still processing
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    attempts++
  }

  throw new Error('Image generation timed out')
}

/**
 * Create a unique product ID for the generated design
 */
export function generateUniqueProductId(): string {
  const timestamp = Date.now()
  const seed = Math.random().toString(36).substring(2, 8)
  const serial = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `UU-${timestamp}-${seed}-${serial}`
}

/**
 * Generate a unique certificate of authenticity
 */
export function generateCertificate(productId: string) {
  const year = new Date().getFullYear()
  const serialNumber = `FFYOU-${year}-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`

  return {
    id: `CERT-${productId}`,
    serialNumber,
    issuedAt: new Date().toISOString(),
    downloadUrl: `/api/certificates/${productId}`,
  }
}
