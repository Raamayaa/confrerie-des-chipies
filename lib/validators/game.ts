import { z } from "zod";

export const gameSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100),

  image: z
    .string()
    .url("L'image doit être une URL valide."),

  description: z
    .string()
    .max(1000)
    .optional()
    .or(z.literal("")),
});

export type GameFormValues = z.infer<typeof gameSchema>;