import { sendCustomerServiceMessage } from '@/src/lib/services/chatService'
import { addChatMessage, getChatSession } from '@/src/lib/services/firebaseService'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface RequestBody {
  sessionId: string
  userId?: string
  message: string
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { sessionId, message, conversationHistory = [] } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 },
      )
    }

    // Send message to Claude API
    const aiResponse = await sendCustomerServiceMessage(message, conversationHistory)

    // Save messages to Firestore if sessionId is provided
    if (sessionId) {
      try {
        await addChatMessage(sessionId, {
          role: 'user',
          content: message,
          timestamp: new Date(),
        })

        await addChatMessage(sessionId, {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        })
      } catch (firestoreError) {
        console.error('Error saving chat to Firestore:', firestoreError)
        // Don't fail the response if Firestore saving fails
      }
    }

    return NextResponse.json(
      {
        message: aiResponse,
        sessionId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error in chat API:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    )
  }
}
