export const runtime = "nodejs";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchFAQs } from "@/lib/searchFAQs";
import { systemInstructions } from "@/lib/chatbot-instructions";
import faqs from "@/data/healthcare-faqs.json";

function normalizeMessages(messages = []) {
  return messages.map(m => ({
    role: m.role,
    content: m.content || m.parts?.map(p => p.text).join(" ") || ""
  }));
}

export async function POST(req) {
  try {
    console.log("Chat API called");
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("Missing API key");
      return new Response("Configuration error. Please check API key.", { status: 200 });
    }
    const body = await req.json();
    const rawMessages = body?.messages || [];
    const messages = normalizeMessages(rawMessages);
    const lastMessage = messages.at(-1)?.content || "";
    console.log("Last message:", lastMessage);
    const relevantFAQs = searchFAQs(lastMessage, faqs);
    const faqContext = relevantFAQs
      .map(f => `Q: ${f.question}\nA: ${f.answer}`)
      .join("\n\n");
    console.log("Found FAQs:", relevantFAQs.length);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    const enhancedMessage = `${systemInstructions}\n\nRelevant FAQs:\n${faqContext}\n\nUser: ${lastMessage}`;
    const chat = model.startChat({
      history,
    });
    console.log("Sending message to Gemini...");
    const result = await chat.sendMessage(enhancedMessage);
    const text = result.response.text();
    console.log("Response generated successfully");
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    console.error("Error details:", error.message);

    return new Response(
      "I'm having trouble processing your request right now. Please try again.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  }
}
