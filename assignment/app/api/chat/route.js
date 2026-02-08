import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"
import { searchFAQs } from "@/lib/searchFAQs"
import { systemInstructions } from "@/lib/chatbot-instructions"
import faqs from "@/data/healthcare-faqs.json"

const gateway = createOpenAI({
  baseURL: "https://gateway.ai.vercel.com/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY,
})

function normalizeMessages(messages = []) {
  return messages.map(m => ({
    role: m.role,
    content:
      m.content ||
      m.parts?.map(p => p.text).join(" ") ||
      ""
  }))
}

export async function POST(req) {
  try {
    const body = await req.json()
    const rawMessages = body?.messages || []
    const messages = normalizeMessages(rawMessages)
    const lastMessage = messages.at(-1)?.content || ""
    const relevantFAQs = searchFAQs(lastMessage, faqs)
    const faqContext = relevantFAQs
      .map(f => `Q: ${f.question}\nA: ${f.answer}`)
      .join("\n\n")
    const systemPrompt = `${systemInstructions}Relevant FAQs:${faqContext}`
    const result = await streamText({
      model: gateway("openai/gpt-4o-mini"),
      system: systemPrompt,
      messages,
    })
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Gateway Error:", error)
    return new Response(
      "AI service temporarily unavailable — please retry.",
      { headers: { "Content-Type": "text/plain" } }
    )
  }
}
