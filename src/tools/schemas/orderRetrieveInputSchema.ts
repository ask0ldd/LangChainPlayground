import { z } from "zod/v4"

const orderRetriveInputSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional()
}).refine(
  data => data.orderId || data.customerName,
  {
    message: "Either orderId or customerName is required.",
    path: ["orderId", "customerName"],
  }
)

export default orderRetriveInputSchema