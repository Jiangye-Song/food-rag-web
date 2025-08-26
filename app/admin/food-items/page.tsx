import { Suspense } from "react"
import { FoodItemsTable } from "@/components/admin/food-items-table"
import { FoodItemsHeader } from "@/components/admin/food-items-header"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FoodItemsPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string }
}) {
  return (
    <div className="space-y-6">
      <FoodItemsHeader />

      <Card>
        <CardContent className="p-0">
          <Suspense fallback={<FoodItemsTableSkeleton />}>
            <FoodItemsTable search={searchParams.search || ""} page={Number.parseInt(searchParams.page || "1")} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function FoodItemsTableSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}
