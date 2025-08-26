"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { deleteFoodItem } from "@/lib/admin-actions"
import { toast } from "sonner"
import { Pagination } from "@/components/ui/pagination"

interface FoodItem {
  id: number
  text: string
  region: string
  type: string
  created_at: string
  updated_at: string
}

interface FoodItemsTableClientProps {
  items: FoodItem[]
  total: number
  totalPages: number
  currentPage: number
  search: string
}

export function FoodItemsTableClient({ items, total, totalPages, currentPage, search }: FoodItemsTableClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? items.map((item) => item.id) : [])
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)))
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this food item?")) {
      startTransition(async () => {
        try {
          await deleteFoodItem(id)
          toast.success("Food item deleted successfully")
          router.refresh()
        } catch (error) {
          toast.error("Failed to delete food item")
        }
      })
    }
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    params.set("page", page.toString())
    router.push(`/admin/food-items?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === items.length && items.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Food Item</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate" title={item.text}>
                    {item.text}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.region}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.type}</Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/food-items/${item.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/food-items/${item.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} disabled={isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}

      <div className="text-sm text-gray-500">
        Showing {items.length} of {total} food items
      </div>
    </div>
  )
}
