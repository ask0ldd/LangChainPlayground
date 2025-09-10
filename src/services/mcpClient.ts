import IMcpTool from "@/interfaces/IMcpTool";

export default class McpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Fetch the list of available tools from the MCP server
  async fetchTools(): Promise<IMcpTool[]> {
    const response = await fetch(`${this.baseUrl}/tools`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tools: ${response.statusText}`);
    }
    const tools: IMcpTool[] = await response.json();
    return tools;
  }

  // Call a tool by name with given input (assumes tool accepts a 'text' input)
  async callTool(toolName: string, inputText: string): Promise<string> {
    // MCP tool call format - make an HTTP POST request to /run/{toolName}
    const response = await fetch(`${this.baseUrl}/run/${toolName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: inputText })
    });

    if (!response.ok) {
      throw new Error(`Tool call failed: ${response.statusText}`);
    }

    // Assuming tool response is JSON with 'output' field
    const result = await response.json();
    return result.output;
  }
}