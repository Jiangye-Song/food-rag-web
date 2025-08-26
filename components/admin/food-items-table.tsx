import { getFoodItems } from "@/lib/admin-actions"
import { FoodItemsTableClient } from "./food-items-table-client"

interface FoodItemsTableProps {
  search: string
  page: number
}

export async function FoodItemsTable({ search, page }: FoodItemsTableProps) {
  const { items, total, totalPages } = await getFoodItems({ search, page, limit: 20 })

  return <FoodItemsTableClient items={items} total={total} totalPages={totalPages} currentPage={page} search={search} />
}
