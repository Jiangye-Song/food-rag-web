import { FoodItemForm } from "@/components/admin/food-item-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewFoodItemPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/food-items">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Food Items
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Food Item</h1>
          <p className="text-gray-600 mt-2">Create a new food entry for the knowledge base</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Food Item Details</CardTitle>
          <CardDescription>Enter the food information that will be used for RAG queries</CardDescription>
        </CardHeader>
        <CardContent>
          <FoodItemForm />
        </CardContent>
      </Card>
    </div>
  )
}
