import { httpAction } from "../_generated/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const handleChat = httpAction(async (ctx, request) => {
  const { messages } = await request.json();

  const systemMessage = `You are Voicera AI, an advanced, highly intelligent assistant integrated into the TodayX dashboard platform. 
Your goal is to provide helpful, concise, and highly accurate answers based on the workspace data and general knowledge.
Format your responses using Markdown when appropriate (e.g., use lists, bold text, code blocks, or tables to structure information).

Workspace Context (simulated):
- The user is viewing the Voicera dashboard.
- Features active: AI Agents, Integrations, Call Logs, Tickets.
- Recent events: 14 mailbox records synchronised, Inbox sorted, Slack webhook alert failed.

You can answer general questions and help users understand their dashboard data.`;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemMessage,
    messages: messages,
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  });
});
