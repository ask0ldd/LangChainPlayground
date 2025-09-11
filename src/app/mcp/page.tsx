// https://medium.com/@sajith_k/creating-an-mcp-server-and-integrating-with-langgraph-5f4fa434a4c7
https://github.com/langchain-ai/langchainjs-mcp-adapters/blob/main/examples/langgraph_example.ts
https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-mcp-adapters
"use client";
import McpClient from "@/services/mcpClient";
import { useState } from "react";

export default function WeatherPage() {
  const mcpClient = new McpClient('http://localhost:8000')


  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 32 }}>
    </div>
  );
}

async function loadMcpTools(client: McpClient): Promise<LangChainTool[]> {
  const mcpTools = await client.fetchTools();
  return mcpTools.map(tool => ({
    name: tool.name,
    description: tool.description,
    run: async (input: string) => {
      return client.callTool(tool.name, input);
    }
  }));
}