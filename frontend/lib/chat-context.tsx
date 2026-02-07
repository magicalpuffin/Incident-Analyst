"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { Analysis, ActionResult } from '@/lib/api'

interface ChatContextType {
  analysis: Analysis | null
  setAnalysis: (analysis: Analysis | null) => void
  actionResult: ActionResult | null
  setActionResult: (actionResult: ActionResult | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  resolved: boolean
  setResolved: (resolved: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [actionResult, setActionResult] = useState<ActionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [resolved, setResolved] = useState(false)

  return (
    <ChatContext.Provider
      value={{
        analysis,
        setAnalysis,
        actionResult,
        setActionResult,
        loading,
        setLoading,
        resolved,
        setResolved,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
