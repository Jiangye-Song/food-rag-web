import { Utensils } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Food RAG</h1>
              <p className="text-sm text-gray-600">Culinary Knowledge Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-500">Powered by RAG Technology</span>
          </div>
        </div>
      </div>
    </header>
  )
}
