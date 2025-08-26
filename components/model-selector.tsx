"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const models = [
    {
      id: "deepseek-r1-distill-llama-70b",
      name: "DeepSeek R1 Distill Llama 70B",
      description: "Advanced reasoning model",
    },
    { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant", description: "Fast and efficient" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", description: "Balanced performance" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <Label htmlFor="model-select" className="text-sm font-medium text-gray-700 mb-2 block">
        AI Model Selection
      </Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger id="model-select" className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div>
                <div className="font-medium">{model.name}</div>
                <div className="text-xs text-gray-500">{model.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
