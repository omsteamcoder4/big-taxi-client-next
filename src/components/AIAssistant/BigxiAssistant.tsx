"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { X, Send, Mic, MicOff, Volume2, VolumeX, Minimize2, Maximize2, Bot } from "lucide-react"
import { useAIAssistant } from "./AIAssistantProvider"

// Minimal typings for the Web Speech API (not part of default TS DOM lib)
interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function BigxiAssistant() {
  const { openAssistant, setOpenAssistant } = useAIAssistant()
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I'm Bigxi, your AI travel assistant. I can help you with bookings, finding the best routes, checking prices, and more. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send message to Gemini API
  const sendToGemini = useCallback(async (userMessage: string): Promise<string> => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
      if (!API_KEY) {
        return "I'm sorry, but the AI service is not configured properly. Please contact support."
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Bigxi, an AI travel assistant for Big Taxi Tiruppur. 
                    
Your personality:
- Friendly, helpful, and enthusiastic about travel
- You specialize in taxi services, outstation trips, airport transfers, and local travel in Tamil Nadu
- You know about popular destinations like Ooty, Kodaikanal, Yercaud, Coimbatore, Chennai, Madurai, etc.
- You can help with booking information, pricing, vehicle types, and travel tips
- You're always positive and encouraging

Current website context:
- Big Taxi Tiruppur offers reliable taxi services across Tamil Nadu
- Services: Outstation trips, airport transfers, local city travel, corporate services
- Vehicle types: Hatchback, Sedan, SUV, Premium Sedan
- Coverage: Tamil Nadu, Karnataka, Kerala, Andhra Pradesh

User question: ${userMessage}

Keep your responses concise, helpful, and friendly. If you don't know something, admit it honestly.`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text
      } else {
        return "I'm having trouble understanding. Could you please rephrase your question?"
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      return "I'm experiencing some technical difficulties. Please try again in a moment, or contact us directly at +91 6381188591."
    }
  }, [])

  const speakText = useCallback((text: string) => {
    if (synthRef.current && !isSpeaking) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthRef.current.speak(utterance)
    } else if (isSpeaking) {
      synthRef.current?.cancel()
      setIsSpeaking(false)
    }
  }, [isSpeaking])

  const handleSendMessage = useCallback(async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Get response from Gemini
      const response = await sendToGemini(messageText)
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

      // Auto-speak the response if it's not too long
      if (response.length < 300) {
        speakText(response)
      }
    } catch (error) {
      console.error('Error getting response:', error)
      setError("Sorry, I couldn't process your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, sendToGemini, speakText])

  // Keep a ref to the latest handleSendMessage so the speech-recognition
  // setup effect below doesn't need to depend on it (and re-run every time
  // isLoading/input change, which would recreate the recognition instance).
  const handleSendMessageRef = useRef(handleSendMessage)
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage
  }, [handleSendMessage])

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognitionCtor) {
        recognitionRef.current = new SpeechRecognitionCtor()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const resultsArray: SpeechRecognitionResult[] = []
          for (let i = 0; i < event.results.length; i++) {
            resultsArray.push(event.results[i])
          }
          const transcript = resultsArray
            .map((result) => result[0].transcript)
            .join('')
          
          setInput(transcript)
          
          if (event.results[0].isFinal) {
            handleSendMessageRef.current(transcript)
          }
        }

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }

      // Speech Synthesis
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.abort()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current?.start()
        setIsListening(true)
      } catch (error) {
        console.error('Error starting recognition:', error)
      }
    }
  }

  const toggleSpeak = (text: string) => {
    if (isSpeaking) {
      synthRef.current?.cancel()
      setIsSpeaking(false)
    } else {
      speakText(text)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Quick reply suggestions
  const quickReplies = [
    "Book a taxi",
    "Show prices",
    "Ooty trip",
    "Airport transfer",
    "Vehicle types"
  ]

  return (
    <>
      {/* Chat Window */}
      {openAssistant && (
        <div
          className={`fixed bottom-24 right-6 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? "h-[60px] w-[300px]" : "h-[500px] w-[380px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Bigxi</h3>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMinimize}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOpenAssistant(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 h-[340px]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-slate-800/80 text-slate-200 border border-white/10"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className="text-[10px] opacity-50 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/80 rounded-2xl px-4 py-2.5 border border-white/10">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-600/20 border border-red-500/30 rounded-xl px-4 py-2">
                      <p className="text-red-400 text-xs">{error}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto border-t border-white/5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSendMessage(reply)}
                    className="px-3 py-1 text-xs bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-full text-slate-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleListening}
                    className={`p-2 rounded-full transition-colors ${
                      isListening
                        ? "bg-red-600 hover:bg-red-700 animate-pulse"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-slate-400" />}
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Bigxi anything..."
                    className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className={`p-2 rounded-full transition-colors ${
                      input.trim() && !isLoading
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
                        : "bg-slate-800 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      const lastMessage = messages.filter(m => m.sender === "assistant").pop()
                      if (lastMessage) toggleSpeak(lastMessage.text)
                    }}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}