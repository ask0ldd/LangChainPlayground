import { tool } from "@langchain/core/tools";
import { ChatGroq } from "@langchain/groq";
import { z } from "zod/v4";
// https://js.langchain.com/docs/concepts/tool_calling/
// https://www.youtube.com/watch?v=pi3C6y4gWFA
// https://github.com/in-tech-gration/LangChain.js

export default async function Test() {
  const llm = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
  })

  const add      = async ({ a, b } : {a : number, b : number}) => a + b;
  const multiply = async ({ a, b } : {a : number, b : number}) => a * b;

  const addInputSchema = z.object({
    a: z.number(),
    b: z.number(),
  });

  const multiplyInputSchema = z.object({
    a: z.number(),
    b: z.number(),
  })

  const addTool = tool(
    add,
    {
      name: "add",
      schema: addInputSchema,
      description: "Adds a and b.", 
    }
  )

  const multiplyTool = tool(
    multiply,
    {
      name: "multiply",
      schema: multiplyInputSchema,
      description: "Multiplies numbers a and b. The arguments a and b must strictly be of type number.",
    }
  )

  const toolsByName = {
    add: addTool,
    multiply: multiplyTool,
  }

  const llmWithTools = llm.bindTools([multiplyTool, addTool])

  const result = await llmWithTools.invoke("What is 12 multiplied by 3?")

  if(result.tool_calls){
    for (const toolCall of result.tool_calls) {
      const toolName = toolCall.name
      const selectedTool = toolsByName[toolName as keyof typeof toolsByName]
      const toolMessage = await selectedTool.invoke(toolCall)
      console.log(`Calling the ${toolCall.name} tool.`)
      console.log(JSON.stringify(toolMessage.content))
      // messages.push(toolMessage);
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <span>content</span>
        <div>
          {JSON.stringify(result)}
        </div>
      </main>
    </div>
  );
}
