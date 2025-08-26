"use server"

import { Index } from "@upstash/vector"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import foodsData from "../data/foods.json"

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
})

interface Source {
  id: string
  text: string
  region: string
  type: string
}

interface RAGResponse {
  sources: Source[]
  answer: string
}

export async function migrateData(): Promise<{ success: boolean; message: string }> {
  try {
    console.log("[v0] Starting data migration to Upstash Vector...")

    // Prepare data for vector insertion
    const vectors = foodsData.map((food) => ({
      id: food.id,
      data: food.text, // Upstash Vector will automatically generate embeddings
      metadata: {
        text: food.text,
        region: food.region,
        type: food.type,
      },
    }))

    // Insert vectors in batches to avoid rate limits
    const batchSize = 10
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize)
      await index.upsert(batch)
      console.log(`[v0] Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(vectors.length / batchSize)}`)
    }

    console.log("[v0] Data migration completed successfully")
    return {
      success: true,
      message: `Successfully migrated ${vectors.length} food items to vector database`,
    }
  } catch (error) {
    console.error("[v0] Migration error:", error)
    return {
      success: false,
      message: `Migration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

async function retrieveRelevantSources(query: string, topK = 3): Promise<Source[]> {
  try {
    console.log("[v0] Performing vector search for:", query)

    // Perform semantic search using Upstash Vector
    const results = await index.query({
      data: query,
      topK,
      includeMetadata: true,
    })

    console.log("[v0] Vector search results:", results.length)

    // Convert results to Source format
    const sources: Source[] = results.map((result) => ({
      id: result.id,
      text: result.metadata?.text as string,
      region: result.metadata?.region as string,
      type: result.metadata?.type as string,
    }))

    return sources
  } catch (error) {
    console.error("[v0] Vector search error:", error)
    // Fallback to empty results if vector search fails
    return []
  }
}

async function generateAnswer(query: string, sources: Source[], model: string): Promise<string> {
  try {
    console.log("[v0] Generating answer with Groq model:", model)

    if (sources.length === 0) {
      return "I couldn't find any relevant information in my knowledge base to answer your question. Could you try rephrasing or asking about a different food topic?"
    }

    // Prepare context from retrieved sources
    const context = sources
      .map((source, index) => `${index + 1}. ${source.text} (Region: ${source.region}, Type: ${source.type})`)
      .join("\n")

    const prompt = `You are a knowledgeable food expert. Based on the following context from a food knowledge base, answer the user's question in a helpful and informative way.

Context:
${context}

User Question: ${query}

Please provide a comprehensive answer based on the context provided. If the context doesn't fully answer the question, acknowledge what information is available and suggest what additional information might be helpful.`

    const { text } = await generateText({
      model: groq(model || process.env.GROQ_MODEL || "deepseek-r1-distill-llama-70b"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    console.log("[v0] Generated answer length:", text.length)
    return text
  } catch (error) {
    console.error("[v0] LLM generation error:", error)
    // Fallback to simple context-based response
    const context = sources.map((s) => s.text).join(" ")
    return `Based on my search through the food knowledge base, here's what I found: ${context}`
  }
}

export async function ragQuery(question: string, model: string): Promise<RAGResponse> {
  try {
    console.log("[v0] Processing RAG query:", question)

    // Step 1: Retrieve relevant sources using vector search
    const sources = await retrieveRelevantSources(question, 3)
    console.log("[v0] Retrieved sources:", sources.length)

    // Step 2: Generate answer using Groq LLM
    const answer = await generateAnswer(question, sources, model)

    return {
      sources,
      answer,
    }
  } catch (error) {
    console.error("[v0] Error in RAG query:", error)
    throw new Error("Failed to process your question. Please try again.")
  }
}

export async function checkDatabaseStatus(): Promise<{ populated: boolean; count?: number }> {
  try {
    // Try to query for a single result to check if database has data
    const results = await index.query({
      data: "food",
      topK: 1,
      includeMetadata: true,
    })

    return {
      populated: results.length > 0,
      count: results.length > 0 ? foodsData.length : 0,
    }
  } catch (error) {
    console.error("[v0] Database status check error:", error)
    return { populated: false }
  }
}
