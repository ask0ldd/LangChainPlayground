import { tool } from "@langchain/core/tools";
import orderRetriveInputSchema from "./schemas/orderRetrieveInputSchema";

const orderRetrieveTool = tool(
    async ({customerName, orderId}) => {
        if(orderId) {
            return ({id : orderId, product : '3 black shirts', customer : 'ced', date : Date.now})
        }

        if(customerName?.toLowerCase().includes("ced")) {
            return ({id : 123456, product : '2 cargo shorts', customer : 'ced', date : Date.now})
        }

        return "no result"
    },
    {
        name: "orderRetrieve",
        schema: orderRetriveInputSchema,
        description: "Retrieve an order using its orderId or the last order for a specific customerName.", 
    }
)

export default orderRetrieveTool