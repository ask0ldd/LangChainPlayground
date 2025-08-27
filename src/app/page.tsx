import { ChatGroq } from "@langchain/groq";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// https://js.langchain.com/docs/integrations/chat/groq/
// https://js.langchain.com/docs/concepts/tool_calling/

export default async function Home() {
  const test = "test2"

  const embeddings = new OllamaEmbeddings({
    model: "mxbai-embed-large",
    baseUrl: "http://localhost:11434",
  });

  // Create documents properly
  const docs = [new Document({ pageContent: "ced" })];

  // Create vector store from documents and embeddings
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

  console.log(JSON.stringify(vectorStore.similaritySearch("ced")))

  const llm = new ChatGroq({
    model: "qwen/qwen3-32b",
    temperature: 0.7,
    maxTokens: 100,
    maxRetries: 2,
  })

  const aiMsg = await llm.invoke([
    {
      role: "system",
      content:
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    },
    { role: "user", content: "I love programming." },
  ]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <span>content {test}</span>
        <div>
          <b>AI Response: </b>{aiMsg.content.toString()}
        </div>
      </main>
    </div>
  );
}
