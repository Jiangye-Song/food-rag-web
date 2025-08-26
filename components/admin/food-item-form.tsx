"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createFoodItem, updateFoodItem } from "@/lib/admin-actions"
import { toast } from "sonner"

interface FoodItem {
  id: number
  text: string
  region: string
  type: string
}

interface FoodItemFormProps {
  initialData?: FoodItem
}

const REGIONS = ["Asia", "Europe", "North America", "South America", "Africa", "Oceania", "Middle East"]

const TYPES = ["Main Course", "Appetizer", "Dessert", "Beverage", "Snack", "Side Dish", "Soup", "Salad"]

export function FoodItemForm({ initialData }: FoodItemFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    text: initialData?.text || "",
    region: initialData?.region || "",
    type: initialData?.type || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.text.trim() || !formData.region || !formData.type) {
      toast.error("Please fill in all required fields")
      return
    }

    startTransition(async () => {
      try {
        if (initialData) {
          await updateFoodItem(initialData.id, formData)
          toast.success("Food item updated successfully")
        } else {
          await createFoodItem(formData)
          toast.success("Food item created successfully")
        }
        router.push("/admin/food-items")
        router.refresh()
      } catch (error) {
        toast.error(initialData ? "Failed to update food item" : "Failed to create food item")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text">Food Description *</Label>
        <Textarea
          id="text"
          placeholder="Enter detailed description of the food item..."
          value={formData.text}
          onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="region">Region *</Label>
          <Select
            value={formData.region}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData ? "Update Food Item" : "Create Food Item"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/food-items")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
