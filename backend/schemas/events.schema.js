import { z } from "zod";

export const createEventSchema = z.object({
  titulo: z.string({
    required_error: "El titulo es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripcion es requerida",
  }),
});
