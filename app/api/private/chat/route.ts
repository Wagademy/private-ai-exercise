import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const BASE_URL = "https://api.venice.ai/api/v1"
const openai = createOpenAI({
  baseURL: BASE_URL,
  apiKey: process.env.VENICE_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('llama-3.3-70b'),
    messages,
  });

  return result.toDataStreamResponse();
}