import { z } from "zod/v4";

const multiplyInputSchema = z.object({
    a: z.number(),
    b: z.number(),
});

export default multiplyInputSchema