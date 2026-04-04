import { generateDesignPrompt, generateDesignImage, generateUniqueProductId, generateCertificate } from '@/lib/services/aiService'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { productType, style, description, colorPalette, additionalNotes } = body

    // Validate required fields
    if (!productType || !style || !description) {
      return Response.json(
        { error: 'Missing required fields: productType, style, description' },
        { status: 400 },
      )
    }

    // Step 1: Generate design prompt and description using Claude
    console.log('Generating design prompt with Claude...')
    const designData = await generateDesignPrompt({
      productType,
      style,
      description,
      colorPalette,
      additionalNotes,
    })

    // Step 2: Generate image using Stable Diffusion
    console.log('Generating image with Stable Diffusion...')
    const imageUrl = await generateDesignImage(designData.imagePrompt)

    // Step 3: Create product with certificate
    const productId = generateUniqueProductId()
    const certificate = generateCertificate(productId)

    // Return the complete design data
    return Response.json({
      success: true,
      product: {
        id: productId,
        title: `AI-Generated ${style} ${productType}`,
        description: designData.productDescription,
        image: imageUrl,
        imagePrompt: designData.imagePrompt,
        tags: designData.designTags,
        productType,
        style,
        colorPalette,
        userInput: {
          description,
          additionalNotes,
        },
        certificate,
        price: calculatePrice(productType),
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Design generation error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return Response.json(
      {
        success: false,
        error: errorMessage,
        message:
          'Failed to generate design. Please check your API keys and try again.',
      },
      { status: 500 },
    )
  }
}

/**
 * Calculate base price based on product type
 */
function calculatePrice(productType: string): number {
  const prices: Record<string, number> = {
    tshirt: 24.99,
    hoodie: 49.99,
    mug: 14.99,
    poster: 19.99,
    canvas: 59.99,
  }

  return prices[productType] || 29.99
}
