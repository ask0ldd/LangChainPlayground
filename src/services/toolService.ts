import { StructuredTool } from "@langchain/core/tools";

export default class ToolService{

    tools : Record<string, StructuredTool> = {}

    constructor(tools : StructuredTool[]){
        tools.forEach(tool => {
            this.tools[tool.name] = tool
        })
    }

    /* 
        Parameters<StructuredTool["invoke"]> 
            extracts the argument type expected by the tool's invoke method, resulting in proper typing for args.

        ReturnType<StructuredTool["invoke"]> 
            extracts the return type of the invoke method.    
    */
    async invoke<T extends string>(toolName : T, args : Parameters<StructuredTool["invoke"]>[0]) : Promise<ReturnType<StructuredTool["invoke"]> | null>{
        if(!this.tools[toolName]) return null
        return this.tools[toolName].invoke(args)
    }
}