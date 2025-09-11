// app/api/mcp/route.ts
import { NextRequest } from "next/server";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler((server) => {
  server.tool(
    "get-weather",
    "Tool to get the weather of a city",
    {
      city: z.string().describe("The name of the city to get the weather for"),
    },
    async ({ city }) => ({
      content: [{ type: "text", text: `The weather in ${city} is sunny` }],
    })
  );
});

// Adapt for Next.js App Router
export async function POST(req: NextRequest) {
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handler(req);
}