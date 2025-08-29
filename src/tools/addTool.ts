import { tool } from "@langchain/core/tools";
import addInputSchema from "./schemas/addInputSchema";
import add from "./functions/add";

const addTool = tool(
    add,
    {
        name: "add",
        schema: addInputSchema,
        description: "Adds numbers a and b. The arguments a and b must strictly be of type number.", 
    }
)

export default addTool