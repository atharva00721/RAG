import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
  } = await req.json();

  // Resolve the requested model:
  // - If webSearch is enabled, force Perplexity Sonar
  // - If the model indicates a Google Gemini variant, construct a Google provider model
  // - Otherwise, pass through the model string unchanged
  const resolvedModel = webSearch
    ? "perplexity/sonar"
    : model?.startsWith("google/")
    ? google(model.split("/")[1] || "gemini-2.5-flash")
    : model?.startsWith("gemini")
    ? google(model === "gemini" ? "gemini-2.5-flash" : model)
    : model;

  const result = streamText({
    model: resolvedModel,
    messages: convertToModelMessages(messages),
    system:
      "You are a helpful assistant that can answer questions and help with tasks",
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}
