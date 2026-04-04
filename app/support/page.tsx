'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, MessageCircle, Loader, Phone, Mail, Clock } from 'lucide-react'
import { useAuth } from '@/src/context/AuthContext'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SupportPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Ciao! 👋 Sono l'assistente di servizio clienti FoundForYou. Come posso aiutarti oggi? Posso rispondere a domande su prodotti, ordini, spedizioni e molto altro.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => `session-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'chat' | 'contact'>('chat')

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput('')
    setLoading(true)

    try {
      // Get conversation history for context
      const conversationHistory = messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }))

      // Call the API endpoint
      const response = await fetch('/api/support/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          userId: user?.id,
          message: userInput,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from support AI')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)

      // Show error message in chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content:
          'Mi scusa, non sono riuscito a processare la tua richiesta. Per favore riprova o contattaci direttamente tramite email o telefono.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Centro Assistenza</h1>
          </div>
          <p className="text-slate-600">Siamo qui per aiutarti 24/7</p>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'chat'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chat AI
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'contact'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Contatti
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'chat' ? (
          // Chat Interface
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chat Window */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-cyan-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-900 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-cyan-100' : 'text-slate-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('it-IT', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin text-slate-600" />
                        <p className="text-sm text-slate-600">Assistente sta scrivendo...</p>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Scrivi il tuo messaggio..."
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Invia</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-4">
              {user && (
                <div className="bg-white rounded-lg shadow p-4">
                  <p className="text-sm text-slate-600">Connesso come:</p>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              )}

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <p className="font-semibold text-cyan-900 mb-3">✨ Suggerimenti</p>
                <ul className="text-sm text-cyan-800 space-y-2">
                  <li>• Chiedi informazioni su prodotti</li>
                  <li>• Traccia il tuo ordine</li>
                  <li>• Domande sulla spedizione</li>
                  <li>• Resi e rimborsi</li>
                  <li>• Problemi tecnici</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold text-amber-900 mb-2">⏱️ Tempo di risposta</p>
                <p className="text-sm text-amber-800">
                  Solitamente rispondo entro pochi secondi
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Contact Information
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Email */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Email</h3>
                <a
                  href="mailto:support@foundforyou.com"
                  className="text-blue-600 hover:underline text-sm"
                >
                  support@foundforyou.com
                </a>
                <p className="text-slate-600 text-xs mt-2">Risposta entro 24 ore</p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Telefono</h3>
                <a href="tel:+39123456789" className="text-purple-600 hover:underline text-sm">
                  +39 (123) 456-789
                </a>
                <p className="text-slate-600 text-xs mt-2">Lun-Ven 9-18</p>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Orari</h3>
                <div className="text-sm text-slate-600">
                  <p>Lun-Ven: 9:00 - 18:00</p>
                  <p>Sab: 10:00 - 14:00</p>
                  <p>Dom: Chiuso</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Domande Frequenti</h2>

              <div className="space-y-4">
                {[
                  {
                    q: 'Quanto tempo ci vuole per la spedizione?',
                    a: 'Gli ordini vengono spediti entro 3-5 giorni lavorativi. La consegna solitamente avviene entro 7-10 giorni lavorativi.',
                  },
                  {
                    q: 'Posso modificare il mio ordine dopo averlo effettuato?',
                    a: 'Puoi modificare il tuo ordine entro 1 ora dal momento della conferma. Contattaci immediatamente per assistenza.',
                  },
                  {
                    q: 'Qual è la vostra politica di reso?',
                    a: 'Offriamo resi gratuiti entro 30 giorni. I prodotti devono essere non utilizzati e nella confezione originale.',
                  },
                  {
                    q: 'Come funziona la personalizzazione AI?',
                    a: 'Puoi usare il nostro editor AI nella sezione "Crea" per personalizzare il tuo prodotto con testi e immagini generate dall\'IA.',
                  },
                ].map((faq, i) => (
                  <details key={i} className="border border-slate-200 rounded-lg p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900 hover:text-cyan-600 transition">
                      {faq.q}
                    </summary>
                    <p className="text-slate-600 mt-3">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
