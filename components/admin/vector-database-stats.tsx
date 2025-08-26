import { getVectorDatabaseStats } from "@/lib/admin-actions"
import { Database, Clock, Zap, Activity } from "lucide-react"

export async function VectorDatabaseStats() {
  const stats = await getVectorDatabaseStats()

  const statItems = [
    {
      label: "Total Vectors",
      value: stats.totalVectors.toLocaleString(),
      icon: Database,
      color: "text-blue-600",
    },
    {
      label: "Last Updated",
      value: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : "Never",
      icon: Clock,
      color: "text-green-600",
    },
    {
      label: "Embedding Model",
      value: stats.embeddingModel || "text-embedding-ada-002",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      label: "Database Status",
      value: stats.status,
      icon: Activity,
      color: stats.status === "healthy" ? "text-green-600" : "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map((item) => (
        <div key={item.label} className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gray-50 ${item.color}`}>
            <item.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
