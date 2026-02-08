export const runtime = "nodejs";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { searchFAQs } from "@/lib/searchFAQs";
import { systemInstructions } from "@/lib/chatbot-instructions";
import faqs from "@/data/healthcare-faqs.json";

function normalizeMessages(messages = []) {
  return messages.map(m => ({
    role: m.role,
    content:
      m.content ||
      m.parts?.map(p => p.text).join(" ") ||
      ""
  }));
}
export async function POST(req) {
  try {
    console.log("Chat API called");

    const body = await req.json();
    const rawMessages = body?.messages || [];
    const messages = normalizeMessages(rawMessages);
    const lastMessage = messages.at(-1)?.content || "";
    const relevantFAQs = searchFAQs(lastMessage, faqs);
    const faqContext = relevantFAQs
      .map(f => `Q: ${f.question}\nA: ${f.answer}`)
      .join("\n\n");

    const systemPrompt = `${systemInstructions}Relevant FAQs:${faqContext}`;
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages,
    });

    return new Response(text, {
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return new Response(
      "AI service temporarily unavailable — please retry.",
      { status: 200 }
    );
  }
}
