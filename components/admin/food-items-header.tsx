"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { bulkDeleteFoodItems, exportFoodItems } from "@/lib/admin-actions"
import { toast } from "sonner"

export function FoodItemsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    params.delete("page") // Reset to first page
    router.push(`/admin/food-items?${params.toString()}`)
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return

    if (confirm(`Are you sure you want to delete ${selectedIds.length} food items?`)) {
      startTransition(async () => {
        try {
          await bulkDeleteFoodItems(selectedIds)
          setSelectedIds([])
          toast.success(`Deleted ${selectedIds.length} food items`)
          router.refresh()
        } catch (error) {
          toast.error("Failed to delete food items")
        }
      })
    }
  }

  const handleExport = () => {
    startTransition(async () => {
      try {
        const data = await exportFoodItems()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `food-items-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success("Food items exported successfully")
      } catch (error) {
        toast.error("Failed to export food items")
      }
    })
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Food Items</h1>
        <p className="text-gray-600 mt-2">Manage your food knowledge base</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search food items..."
            className="pl-10 w-full sm:w-64"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          {selectedIds.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={isPending}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedIds.length})
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={handleExport} disabled={isPending}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Link href="/admin/food-items/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Food Item
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
