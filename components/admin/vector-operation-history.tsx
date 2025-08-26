import { getVectorOperationHistory } from "@/lib/admin-actions"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Loader } from "lucide-react"
import { DatabaseSetupNotice } from "./database-setup-notice"

export async function VectorOperationHistory() {
  const operations = await getVectorOperationHistory()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "in_progress":
        return <Loader className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  if (!operations) {
    return <DatabaseSetupNotice />
  }

  if (operations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No operations recorded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {operations.map((operation) => (
        <div key={operation.id} className="flex items-center space-x-4 p-3 rounded-lg border">
          {getStatusIcon(operation.status)}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{operation.operation_type}</p>
              {getStatusBadge(operation.status)}
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">{operation.items_processed} items processed</p>
              <p className="text-xs text-gray-500">{new Date(operation.created_at).toLocaleString()}</p>
            </div>
            {operation.error_message && <p className="text-xs text-red-600 mt-1">{operation.error_message}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
