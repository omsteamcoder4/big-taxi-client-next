"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

interface AIAssistantContextType {
  openAssistant: boolean
  setOpenAssistant: (open: boolean) => void
  sendMessage: (message: string) => void
  isOpen: boolean
  pendingMessage: string | null
  clearPendingMessage: () => void
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined)

export function AIAssistantProvider({ children }: { children: React.ReactNode }) {
  const [openAssistant, setOpenAssistant] = useState(false)
  const [messageToSend, setMessageToSend] = useState<string | null>(null)

  const sendMessage = useCallback((message: string) => {
    setMessageToSend(message)
    setOpenAssistant(true)
  }, [])

  const clearPendingMessage = useCallback(() => {
    setMessageToSend(null)
  }, [])

  return (
    <AIAssistantContext.Provider
      value={{
        openAssistant,
        setOpenAssistant,
        sendMessage,
        isOpen: openAssistant,
        pendingMessage: messageToSend,
        clearPendingMessage
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  )
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (context === undefined) {
    throw new Error("useAIAssistant must be used within an AIAssistantProvider")
  }
  return context
}