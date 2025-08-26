"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getResponseTimeData } from "@/lib/admin-actions"

interface ResponseTimeData {
  date: string
  avgResponseTime: number
  queryCount: number
}

export function ResponseTimeChart() {
  const [data, setData] = useState<ResponseTimeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTimeData = await getResponseTimeData()
        setData(responseTimeData)
      } catch (error) {
        console.error("Failed to fetch response time data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-gray-500">Loading chart data...</div>
  }

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === "avgResponseTime" ? `${value}ms` : value,
              name === "avgResponseTime" ? "Avg Response Time" : "Query Count",
            ]}
          />
          <Line type="monotone" dataKey="avgResponseTime" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
