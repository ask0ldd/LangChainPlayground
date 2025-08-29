import addTool from "@/tools/addTool";
import multiplyTool from "@/tools/multiplyTool";
import orderRetrieveTool from "@/tools/orderRetrieveTool";
import { sentimentTool } from "@/tools/sentimentAnalyzer";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
// https://js.langchain.com/docs/concepts/tool_calling/
// https://www.youtube.com/watch?v=pi3C6y4gWFA
// https://github.com/in-tech-gration/LangChain.js
// https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/?ajs_aid=4c487466-0b7f-4925-96a6-a76122227d21#making-your-first-agent-using-langgraph

export default async function Langraph() {

  // Define the tools for the agent to use
  const agentTools = [multiplyTool, addTool, sentimentTool, orderRetrieveTool]
  const agentModel = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
  })

  // Initialize memory to persist state between graph runs
  const agentCheckpointer = new MemorySaver();
  const agent = createReactAgent({
    llm: agentModel,
    tools: agentTools,
    checkpointSaver: agentCheckpointer,
  })

  // Now it's time to use!
  const agentFinalState = await agent.invoke(
    { messages: [new HumanMessage("How much is 13 plus 3?")] },
    { configurable: { thread_id: "42" } },
  )

  console.log(
    agentFinalState.messages[agentFinalState.messages.length - 1].content,
  )

  const agentNextState = await agent.invoke(
    { messages: [new HumanMessage("Mutiply the result by 5")] },
    { configurable: { thread_id: "42" } },
  )

  console.log(
    agentNextState.messages[agentNextState.messages.length - 1].content,
  )

  const negativeReview = "The product is far too large. It doesn't seem the match an european XL size."
  const positiveReview = "The product match the picture as it is beautiful and stylish."
  const agentSentimentState = await agent.invoke(
    { messages: [new HumanMessage(`Can you rate the following review : "${negativeReview}"`)] },
    { configurable: { thread_id: "42" } },
  )

  console.log(
    agentSentimentState.messages[agentSentimentState.messages.length - 1].content,
  )

  const apologyState = await agent.invoke(
    { messages: [new HumanMessage(`If the review is negative, respond with a brief apology. If it is positive, reply with a short thank-you message. All messages should be 3-liners and as specific as possible.`)] },
    { configurable: { thread_id: "42" } },
  )

  console.log(
    apologyState.messages[apologyState.messages.length - 1].content,
  )

  const orderState = await agent.invoke(
    { messages: [new HumanMessage(`My name is Ced Arthus, what was my last order?`)] },
    { configurable: { thread_id: "42" } },
  )

  console.log(
    orderState.messages[orderState.messages.length - 1].content,
  )


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
