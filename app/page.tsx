import { ChatInterface } from "@/components/chat-interface"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍽️ Food RAG Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ask me anything about food! I'll search through my knowledge base and provide detailed answers about
            ingredients, cuisines, and culinary traditions.
          </p>
        </div>
        <ChatInterface />
      </main>
      <Footer />
    </div>
  )
}
