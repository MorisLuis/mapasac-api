import { z } from "zod";

export const getBagQuerySchema = z.object({
    option: z.string().min(1, "option es requerido"),
    page: z.string().min(1, "page es requerido"),
    limit: z.string().min(1, "limit es requerido"),
});
