import addTool from "@/tools/addTool";
import mockWeatherTool from "@/tools/mockWeatherTool";
import multiplyTool from "@/tools/multiplyTool";
import orderRetrieveTool from "@/tools/orderRetrieveTool";
import { sentimentTool } from "@/tools/sentimentAnalyzer";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { LLMChain } from "langchain/chains";
// https://js.langchain.com/docs/concepts/tool_calling/
// https://www.youtube.com/watch?v=pi3C6y4gWFA
// https://github.com/in-tech-gration/LangChain.js
// https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/?ajs_aid=4c487466-0b7f-4925-96a6-a76122227d21#making-your-first-agent-using-langgraph

// https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB/sections/CAQiQ0NCQVNMQW9JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlOQ0FRYUNRb0hMMjB2TUcxcmVpb0pFZ2N2YlM4d2JXdDZLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB?hl=en-US&gl=US&ceid=US%3Aen

export default async function Summarization() {

  
  const model2 = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
  })

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a helpful assistant."],
    ["user", "Tell me a {adjective} joke"]
  ]);
  const chain = prompt.pipe(model2);
  const response = await chain.invoke({ adjective: "funny" })
  console.log('response:', response.content || response.text || response);

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
