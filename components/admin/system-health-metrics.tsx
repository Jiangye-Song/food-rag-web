import { getSystemHealthMetrics } from "@/lib/admin-actions"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export async function SystemHealthMetrics() {
  const health = await getSystemHealthMetrics()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-400"
    }
  }

  const metrics = [
    {
      name: "PostgreSQL Database",
      status: health.database.status,
      value: health.database.connectionTime ? `${health.database.connectionTime}ms` : "N/A",
    },
    {
      name: "Upstash Vector DB",
      status: health.vectorDb.status,
      value: `${health.vectorDb.vectorCount} vectors`,
    },
    {
      name: "Groq API",
      status: health.groqApi.status,
      value: health.groqApi.lastResponseTime ? `${health.groqApi.lastResponseTime}ms` : "N/A",
    },
    {
      name: "System Memory",
      status: health.system.memoryStatus,
      value: `${health.system.memoryUsage}%`,
    },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(metric.status)}
            <span className="text-sm font-medium">{metric.name}</span>
          </div>
          <span className={`text-sm ${getStatusColor(metric.status)}`}>{metric.value}</span>
        </div>
      ))}

      <div className="pt-4 border-t">
        <div className="text-xs text-gray-500">
          <p>Last updated: {new Date(health.lastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
