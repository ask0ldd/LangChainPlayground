import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { Tool } from "langchain/tools";
// https://js.langchain.com/docs/concepts/tool_calling/
// https://www.youtube.com/watch?v=pi3C6y4gWFA
// https://github.com/in-tech-gration/LangChain.js
// https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/?ajs_aid=4c487466-0b7f-4925-96a6-a76122227d21#making-your-first-agent-using-langgraph
// https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB/sections/CAQiQ0NCQVNMQW9JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlOQ0FRYUNRb0hMMjB2TUcxcmVpb0pFZ2N2YlM4d2JXdDZLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB?hl=en-US&gl=US&ceid=US%3Aen
// https://js.langchain.com/docs/tutorials/

export default async function EComChatbot() {

  // Step 1: Define system and user prompts
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an e-commerce assistant."],
    ["user", "{input}"],
    new MessagesPlaceholder("agentScratchpad") // Tracks intermediate tool calls
  ])

  // Step 2: Define your tools
  const tools: Tool[] = [
    // Example tool config (implement your tools here)
  ]

  // Step 3: Initialize the chat model
  const model = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
  })

  // Step 4: Create your agent from the prompt and tools
  const agent = createToolCallingAgent({llm : model, tools, prompt})

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    returnIntermediateSteps: true,
    verbose: true
  })

  // Step 6: Invoke the agent in your application code
  const response = await agentExecutor.invoke({ input: "Find the latest promotions on shoes." })

  // Output or use the response in your app
  console.log(response)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <span>content</span>
        <div>
          LangGraph
        </div>
      </main>
    </div>
  );
}
