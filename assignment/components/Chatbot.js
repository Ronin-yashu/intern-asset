"use client"

import React from "react"
import { useChat } from "@ai-sdk/react"
import { MessageCircle, X, Send } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [localInput, setLocalInput] = React.useState("")

  const chat = useChat({ api: "/api/chat" }) || {}

  const {
    messages = [],
    input,
    handleInputChange,
    sendMessage,
    isLoading = false,
  } = chat

  const currentInput =
    typeof input === "string" ? input : localInput

  const onChange = (e) => {
    if (handleInputChange) handleInputChange(e)
    else setLocalInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    sendMessage?.({ text: currentInput })

    if (!handleInputChange) setLocalInput("")
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[95vw] sm:max-w-md h-[600px] bg-white shadow-2xl rounded-lg flex flex-col z-50">

          <div className="bg-blue-600 text-white p-4 flex justify-between">
            <b>Healthcare Assistant</b>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map(m => (
              <div key={m.id}>
                <b>{m.role}:</b> {m.content}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-3 border-t flex gap-2">
            <input
              value={currentInput}
              onChange={onChange}
              className="flex-1 border px-3 py-2 rounded"
              placeholder="Type your question..."
            />
            <button className="bg-blue-600 text-white px-3 rounded">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
