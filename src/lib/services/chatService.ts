import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
})

// System prompt for customer service AI
const CUSTOMER_SERVICE_SYSTEM = `You are a helpful and friendly customer service AI assistant for FoundForYou, an e-commerce platform selling AI-personalized products.

You help customers with:
- Product information and recommendations
- Order status and tracking
- Shipping and delivery questions
- Product customization options
- Returns and refunds
- General account questions
- Technical issues

Be professional, empathetic, and solution-focused. If you don't know something, offer to escalate to a human agent.
Always be helpful in Italian (if the user writes in Italian) or English (if they write in English).
Keep responses concise but complete.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export interface ChatSession {
  id: string
  userId: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

// Quick responses for common queries (helps reduce API calls)
const QUICK_RESPONSES: { [key: string]: string } = {
  ciao: 'Ciao! 👋 Sono l\'assistente di FoundForYou. Come posso aiutarti oggi?',
  ordine: 'Puoi tracciare il tuo ordine nella sezione "Il Mio Profilo" oppure condividi il numero dell\'ordine e ti aiuterò!',
  spedizione:
    'Le spedizioni solitamente avvengono entro 3-5 giorni lavorativi. La consegna arriva in 7-10 giorni lavorativi dalla spedizione.',
  prezzo: 'I nostri prezzi variano in base al tipo di prodotto e al livello di personalizzazione. Visita il negozio per una lista completa!',
  rimborso:
    'Offriamo resi gratuiti entro 30 giorni. Il prodotto deve essere non utilizzato e nella confezione originale. Contattaci per i dettagli!',
}

/**
 * Check if the message matches a quick response pattern
 */
const checkQuickResponse = (message: string): string | null => {
  const lowerMessage = message.toLowerCase().trim()

  for (const [keyword, response] of Object.entries(QUICK_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }

  return null
}

/**
 * Send a message to the customer service AI
 * @param userMessage The user's message
 * @param conversationHistory Previous messages in the conversation
 * @returns The AI's response
 */
export const sendCustomerServiceMessage = async (
  userMessage: string,
  conversationHistory: ChatMessage[] = [],
): Promise<string> => {
  try {
    // Check for quick responses first
    const quickResponse = checkQuickResponse(userMessage)
    if (quickResponse) {
      return quickResponse
    }

    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: userMessage,
      },
    ]

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: CUSTOMER_SERVICE_SYSTEM,
      messages,
    })

    const assistantMessage = response.content[0]
    if (assistantMessage.type === 'text') {
      return assistantMessage.text
    }

    throw new Error('Unexpected response format')
  } catch (error) {
    console.error('Error in customer service chat:', error)
    throw error
  }
}

/**
 * Get conversation context from user's account (orders, account info, etc.)
 * This can be used to enhance the AI's understanding
 */
export const buildContextualSystemPrompt = (userContext?: {
  name?: string
  orders?: number
  accountAge?: string
  recentOrder?: any
}): string => {
  let contextualPrompt = CUSTOMER_SERVICE_SYSTEM

  if (userContext) {
    contextualPrompt += `\n\nUser Information:\n`
    if (userContext.name) contextualPrompt += `- Name: ${userContext.name}\n`
    if (userContext.orders) contextualPrompt += `- Number of previous orders: ${userContext.orders}\n`
    if (userContext.accountAge) contextualPrompt += `- Account age: ${userContext.accountAge}\n`
    if (userContext.recentOrder)
      contextualPrompt += `- Most recent order: ${JSON.stringify(userContext.recentOrder)}\n`
  }

  return contextualPrompt
}
