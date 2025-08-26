import { getPopularFoodTypes } from "@/lib/admin-actions"
import { Badge } from "@/components/ui/badge"

export async function PopularFoodTypes() {
  const foodTypes = await getPopularFoodTypes()

  if (foodTypes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No food type data available yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {foodTypes.map((type, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{type.type}</Badge>
            <span className="text-sm text-gray-600">{type.region}</span>
          </div>
          <span className="text-sm font-medium">{type.query_count}</span>
        </div>
      ))}
    </div>
  )
}
