import { tool } from "@langchain/core/tools";
import addInputSchema from "./schemas/addInputSchema";
import add from "./functions/add";

const addTool = tool(
    add,
    {
        name: "add",
        schema: addInputSchema,
        description: "Adds a and b.", 
    }
)

export default addTool