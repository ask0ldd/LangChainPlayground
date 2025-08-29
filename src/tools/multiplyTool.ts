import { tool } from "@langchain/core/tools";
import multiply from "./functions/multiply";
import multiplyInputSchema from "./schemas/addMultiplySchema";

const multiplyTool = tool(
    multiply,
    {
        name: "multiply",
        schema: multiplyInputSchema,
        description: "Multiplies numbers a and b. The arguments a and b must strictly be of type number.",
    }
)

export default multiplyTool