"use client"
import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      })

      if (!response.ok) throw new Error("Failed to get response")

      const text = await response.text()
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50" aria-label="Open chat">
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[95vw] sm:w-100 h-150 bg-white shadow-2xl rounded-lg flex flex-col z-50 border border-gray-200">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <span className="font-bold text-lg">Healthcare Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition-colors" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-gray-600 text-center mt-8 text-sm">
                👋 Ask me anything about healthcare!
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg max-w-[85%] ${message.role === "user"? "bg-blue-600": "bg-white border border-gray-200 shadow-sm"}`}>
                  <div className={`font-semibold text-xs mb-1 ${message.role === "user" ? "text-blue-100" : "text-gray-600"
                  }`}>{message.role === "user" ? "You" : "Assistant"}</div>
                  <div className={`text-sm whitespace-pre-wrap wrap-break-word ${message.role === "user" ? "text-white" : "text-gray-900"}`}>{message.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white rounded-b-lg flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" placeholder="Type your question..." disabled={isLoading}/>
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
