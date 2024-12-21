import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

const BASE_URL = "http://localhost:11434/api";
const openai = createOllama({
  baseURL: BASE_URL,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("llama3.2"),
    messages,
  });

  return result.toDataStreamResponse();
}
