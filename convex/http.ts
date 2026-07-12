import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { handleChat } from "./chat/ai";

const http = httpRouter();

http.route({
  path: "/api/chat",
  method: "POST",
  handler: handleChat,
});

// Handle CORS Preflight
http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

export default http;
