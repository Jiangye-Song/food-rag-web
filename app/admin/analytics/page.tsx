import { Suspense } from "react"
import { SystemHealthMetrics } from "@/components/admin/system-health-metrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Health</h1>
        <p className="text-gray-600 mt-2">Monitor your RAG system health and performance</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Database and service status monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<SystemHealthSkeleton />}>
              <SystemHealthMetrics />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SystemHealthSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}
