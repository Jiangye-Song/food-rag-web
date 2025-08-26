"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, RefreshCw, Plus, AlertTriangle } from "lucide-react"
import { flushVectorDatabase, reEmbedAllItems, embedNewItems } from "@/lib/admin-actions"
import { toast } from "sonner"

export function VectorDatabaseActions() {
  const [isPending, startTransition] = useTransition()
  const [operation, setOperation] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFlushDatabase = () => {
    if (confirm("Are you sure you want to delete ALL vectors? This action cannot be undone.")) {
      setOperation("flush")
      startTransition(async () => {
        try {
          await flushVectorDatabase()
          toast.success("Vector database flushed successfully")
        } catch (error) {
          toast.error("Failed to flush vector database")
        } finally {
          setOperation(null)
          setProgress(0)
        }
      })
    }
  }

  const handleReEmbedAll = () => {
    if (confirm("This will re-embed all food items. This may take several minutes. Continue?")) {
      setOperation("re-embed")
      setProgress(0)
      startTransition(async () => {
        try {
          await reEmbedAllItems((progress) => {
            setProgress(progress)
          })
          toast.success("All items re-embedded successfully")
        } catch (error) {
          toast.error("Failed to re-embed items")
        } finally {
          setOperation(null)
          setProgress(0)
        }
      })
    }
  }

  const handleEmbedNew = () => {
    setOperation("embed-new")
    setProgress(0)
    startTransition(async () => {
      try {
        const result = await embedNewItems((progress) => {
          setProgress(progress)
        })
        toast.success(`Embedded ${result.newItemsCount} new items`)
      } catch (error) {
        toast.error("Failed to embed new items")
      } finally {
        setOperation(null)
        setProgress(0)
      }
    })
  }

  return (
    <div className="space-y-4">
      {operation && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {operation === "flush" && "Flushing vector database..."}
            {operation === "re-embed" && `Re-embedding all items... ${Math.round(progress)}%`}
            {operation === "embed-new" && `Embedding new items... ${Math.round(progress)}%`}
          </AlertDescription>
          {(operation === "re-embed" || operation === "embed-new") && <Progress value={progress} className="mt-2" />}
        </Alert>
      )}

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
          onClick={handleEmbedNew}
          disabled={isPending}
        >
          <Plus className="h-4 w-4 mr-2" />
          Embed New Items Only
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start bg-transparent"
          onClick={handleReEmbedAll}
          disabled={isPending}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Re-embed All Items
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleFlushDatabase}
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Flush All Vectors
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          • <strong>Embed New Items:</strong> Only embed items created after the last embedding operation
        </p>
        <p>
          • <strong>Re-embed All:</strong> Re-process all food items and update their vector embeddings
        </p>
        <p>
          • <strong>Flush All:</strong> Delete all vectors from the database (irreversible)
        </p>
      </div>
    </div>
  )
}
