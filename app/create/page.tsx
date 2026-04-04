'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Zap, Palette, Wand2 } from 'lucide-react'

export default function CreatePage() {
  const [step, setStep] = useState<'intro' | 'style' | 'description' | 'customization' | 'generate'>('intro')
  const [formData, setFormData] = useState({
    productType: 'tshirt',
    style: 'cosmic',
    description: '',
    additionalNotes: '',
    colorPalette: 'vibrant',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProduct, setGeneratedProduct] = useState<any>(null)
  const [generationError, setGenerationError] = useState<string | null>(null)

  const productTypes = [
    { id: 'tshirt', name: 'T-Shirt', icon: '👕' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥' },
    { id: 'mug', name: 'Mug', icon: '☕' },
    { id: 'poster', name: 'Poster', icon: '🖼️' },
    { id: 'canvas', name: 'Canvas', icon: '🎨' },
    { id: 'hoodie', name: 'Hoodie', icon: '🧥' },
  ]

  const styles = [
    { id: 'cosmic', name: 'Cosmic', desc: 'Space & celestial vibes' },
    { id: 'minimalist', name: 'Minimalist', desc: 'Clean & simple' },
    { id: 'retro', name: 'Retro', desc: 'Vintage aesthetic' },
    { id: 'abstract', name: 'Abstract', desc: 'Bold & artistic' },
    { id: 'fantasy', name: 'Fantasy', desc: 'Magical & mythical' },
    { id: 'cyberpunk', name: 'Cyberpunk', desc: 'Futuristic & tech' },
  ]

  const colorPalettes = [
    { id: 'vibrant', name: 'Vibrant', colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC'] },
    { id: 'pastel', name: 'Pastel', colors: ['#FFB4D5', '#C8B3F8', '#A8E6CF', '#FFE5B4'] },
    { id: 'dark', name: 'Dark', colors: ['#1A1A1A', '#2D2D2D', '#404040', '#D0D0D0'] },
    { id: 'natural', name: 'Natural', colors: ['#8B7355', '#D2B48C', '#A0522D', '#CD853F'] },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationError(null)
    try {
      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate design')
      }

      const data = await response.json()
      setGeneratedProduct(data.product)
      setStep('generate')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      setGenerationError(message)
      console.error('Generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-100">
      {/* Hero Banner */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Wand2 className="w-10 h-10" />
            Create with AI
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Describe your vision, and our AI will generate a unique design just for you
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            {['intro', 'style', 'description', 'customization', 'generate'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                    step === s
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-110'
                      : i < ['intro', 'style', 'description', 'customization', 'generate'].indexOf(step)
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {i + 1}
                </div>
                {i < 4 && <div className="w-8 h-1 bg-slate-700 mx-2" />}
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm">
            Step {['intro', 'style', 'description', 'customization', 'generate'].indexOf(step) + 1} of 5
          </p>
        </div>

        {/* Step 1: Product Type */}
        {step === 'intro' && (
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">What would you like to create?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {productTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setFormData({ ...formData, productType: type.id })
                    setStep('style')
                  }}
                  className={`p-6 rounded-lg border-2 transition text-center ${
                    formData.productType === type.id
                      ? 'border-cyan-600 bg-cyan-50'
                      : 'border-slate-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <p className="font-semibold text-slate-900">{type.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Style Selection */}
        {step === 'style' && (
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose a style</h2>
            <p className="text-slate-600 mb-8">What aesthetic appeals to you?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setFormData({ ...formData, style: s.id })
                    setStep('description')
                  }}
                  className={`p-6 rounded-lg border-2 transition text-left ${
                    formData.style === s.id
                      ? 'border-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50'
                      : 'border-slate-200 hover:border-cyan-400'
                  }`}
                >
                  <h3 className="font-semibold text-slate-900 mb-1">{s.name}</h3>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Description */}
        {step === 'description' && (
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Describe your vision</h2>
            <p className="text-slate-600 mb-8">Tell the AI what you're imagining. Be as creative as you want!</p>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., A serene meditation landscape with flowing water and glowing crystals, in cosmic purples and blues..."
              className="w-full h-40 p-4 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 resize-none mb-8"
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setStep('style')}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => formData.description.length > 10 && setStep('customization')}
                disabled={formData.description.length < 10}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Customization */}
        {step === 'customization' && (
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Fine-tune your design</h2>

            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">Color Palette</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.id}
                    onClick={() => setFormData({ ...formData, colorPalette: palette.id })}
                    className={`p-4 rounded-lg border-2 transition ${
                      formData.colorPalette === palette.id
                        ? 'border-cyan-600 bg-cyan-50'
                        : 'border-slate-200 hover:border-cyan-400'
                    }`}
                  >
                    <h4 className="font-semibold text-slate-900 mb-3">{palette.name}</h4>
                    <div className="flex gap-2">
                      {palette.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-slate-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-4">Additional Notes (Optional)</h3>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Any specific elements, moods, or references you'd like included..."
                className="w-full h-24 p-4 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setStep('description')}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? 'Generating...' : 'Generate Design'}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 'generate' && !isGenerating && (
          <div className="bg-white rounded-lg p-8 mb-8">
            {generationError ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❌</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Generation Failed</h2>
                <p className="text-red-600 mb-8">{generationError}</p>
                <button
                  onClick={() => setStep('customization')}
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <Sparkles className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Design is Ready! ✨</h2>
                  <p className="text-slate-600 mb-8">
                    Your AI-generated design is complete. Review it below!
                  </p>
                </div>

                {/* Preview Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* AI Generated Image */}
                  <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                    {generatedProduct?.image ? (
                      <img
                        src={generatedProduct.image}
                        alt="Generated design"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="animate-spin mb-4">
                          <Zap className="w-12 h-12 text-purple-600 mx-auto" />
                        </div>
                        <p className="text-slate-700 font-medium">Generated image preview</p>
                      </div>
                    )}
                  </div>

                  {/* Design Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Product Type</h3>
                      <p className="text-slate-700 capitalize">{generatedProduct?.productType || formData.productType}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Style</h3>
                      <p className="text-slate-700 capitalize">{generatedProduct?.style || formData.style}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">AI Description</h3>
                      <p className="text-slate-700">{generatedProduct?.description || 'Generating...'}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Design Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedProduct?.tags?.map((tag: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {generatedProduct?.price && (
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Price</h3>
                        <p className="text-2xl font-bold text-cyan-600">${generatedProduct.price.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}


            {!generationError && (
              <>
                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setStep('intro')
                      setFormData({
                        productType: 'tshirt',
                        style: 'cosmic',
                        description: '',
                        additionalNotes: '',
                        colorPalette: 'vibrant',
                      })
                      setGeneratedProduct(null)
                    }}
                    className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition"
                  >
                    Create Another
                  </button>

                  <Link
                    href="/product"
                    className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition text-center"
                  >
                    View Details
                  </Link>

                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {isGenerating && (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="inline-block mb-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-spin" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-cyan-600" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">AI is creating your design...</h3>
            <p className="text-slate-600 mb-4">This usually takes 30-60 seconds. Our AI is combining Claude for creativity with Stable Diffusion for beautiful imagery.</p>
            <div className="flex gap-2 justify-center mb-4">
              <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
