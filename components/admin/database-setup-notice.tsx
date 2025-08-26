import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Database, Play } from "lucide-react"

export function DatabaseSetupNotice() {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="h-5 w-5" />
          Database Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-orange-700">
          The admin dashboard requires additional database tables to function properly. Please run the setup script to
          create the required tables.
        </p>

        <div className="space-y-2">
          <h4 className="font-medium text-orange-800 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Required Steps:
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-orange-700 ml-6">
            <li>Go to Project Settings → Integrations</li>
            <li>Add the Neon database integration</li>
            <li>
              Run the script: <code className="bg-orange-100 px-1 rounded">scripts/create-admin-tables.sql</code>
            </li>
            <li>
              Optionally run: <code className="bg-orange-100 px-1 rounded">scripts/seed-food-items.sql</code>
            </li>
          </ol>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Play className="h-4 w-4 text-orange-600" />
          <span className="text-sm text-orange-700">
            After running the scripts, refresh this page to access all admin features.
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
