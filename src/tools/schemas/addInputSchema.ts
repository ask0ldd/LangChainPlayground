import { z } from "zod/v4";

const addInputSchema = z.object({
    a: z.number(),
    b: z.number(),
});

export default addInputSchema