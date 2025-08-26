import { Suspense } from "react"
import { VectorDatabaseStats } from "@/components/admin/vector-database-stats"
import { VectorDatabaseActions } from "@/components/admin/vector-database-actions"
import { VectorOperationHistory } from "@/components/admin/vector-operation-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function VectorDatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Vector Database Management</h1>
        <p className="text-gray-600 mt-2">Manage your Upstash Vector database and embeddings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Statistics</CardTitle>
              <CardDescription>Current status of your vector database</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<VectorStatsSkeleton />}>
                <VectorDatabaseStats />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operation History</CardTitle>
              <CardDescription>Recent vector database operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<OperationHistorySkeleton />}>
                <VectorOperationHistory />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Database Actions</CardTitle>
              <CardDescription>Manage your vector embeddings</CardDescription>
            </CardHeader>
            <CardContent>
              <VectorDatabaseActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function VectorStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      ))}
    </div>
  )
}

function OperationHistorySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-2 w-2 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  )
}
