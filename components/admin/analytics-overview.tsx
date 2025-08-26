import { getAnalyticsOverview } from "@/lib/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Clock, TrendingUp, Users } from "lucide-react"
import { DatabaseSetupNotice } from "./database-setup-notice"

export async function AnalyticsOverview() {
  const overview = await getAnalyticsOverview()

  if (!overview || (overview.totalQueries === 0 && overview.avgResponseTime === 0)) {
    return <DatabaseSetupNotice />
  }

  const metrics = [
    {
      title: "Total Queries",
      value: overview.totalQueries.toLocaleString(),
      change: `+${overview.queriesGrowth}%`,
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Avg Response Time",
      value: `${overview.avgResponseTime}ms`,
      change: `-${overview.responseTimeImprovement}%`,
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "Success Rate",
      value: `${overview.successRate}%`,
      change: `+${overview.successRateChange}%`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Active Users",
      value: overview.activeUsers.toLocaleString(),
      change: `+${overview.userGrowth}%`,
      icon: Users,
      color: "text-orange-600",
    },
  ]

  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{metric.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
