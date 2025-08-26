import { getQueryAnalytics } from "@/lib/admin-actions"
import { Progress } from "@/components/ui/progress"

export async function QueryAnalytics() {
  const queries = await getQueryAnalytics()

  if (queries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No query data available yet</p>
      </div>
    )
  }

  const maxCount = Math.max(...queries.map((q) => q.count))

  return (
    <div className="space-y-4">
      {queries.map((query, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium truncate flex-1 mr-2">{query.query}</span>
            <span className="text-gray-500 whitespace-nowrap">{query.count} times</span>
          </div>
          <Progress value={(query.count / maxCount) * 100} className="h-2" />
        </div>
      ))}
    </div>
  )
}
