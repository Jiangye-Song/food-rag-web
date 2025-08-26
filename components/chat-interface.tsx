"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Loader2, Brain, Search } from "lucide-react"
import { ragQuery } from "@/lib/rag-actions"
import { ModelSelector } from "./model-selector"

interface Source {
  id: string
  text: string
  region: string
  type: string
}

interface RAGResponse {
  sources: Source[]
  answer: string
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  sources?: Source[]
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("deepseek-r1-distill-llama-70b")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await ragQuery(input.trim(), selectedModel)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I apologize, but I encountered an error processing your question. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />

      <div className="space-y-4 min-h-[400px]">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to explore food knowledge!</h3>
            <p className="text-gray-600">
              Ask me about ingredients, cuisines, cooking techniques, or any food-related questions.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] ${message.type === "user" ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "bg-white border border-gray-200"} rounded-lg p-4 shadow-sm`}
            >
              {message.type === "user" ? (
                <p>{message.content}</p>
              ) : (
                <div className="space-y-4">
                  {message.sources && message.sources.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Search className="h-4 w-4 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">Sources Retrieved</h4>
                      </div>
                      <div className="grid gap-3">
                        {message.sources.map((source, index) => (
                          <Card key={source.id} className="border-l-4 border-l-orange-500">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Source {index + 1}</CardTitle>
                                <div className="flex space-x-1">
                                  {source.region && (
                                    <Badge variant="secondary" className="text-xs">
                                      {source.region}
                                    </Badge>
                                  )}
                                  {source.type && (
                                    <Badge variant="outline" className="text-xs">
                                      {source.type}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-sm text-gray-700">"{source.text}"</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold text-gray-900">AI Response</h4>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
                      <p className="text-gray-800">{message.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Processing your question...</p>
                  <p className="text-xs text-gray-600">Searching knowledge base and generating response</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about any food, ingredient, or cuisine..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
