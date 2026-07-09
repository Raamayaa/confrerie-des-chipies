import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(2, "Le titre est obligatoire."),
  description: z.string().optional(),
  event_date: z.string().min(1, "La date est obligatoire."),
  discord_link: z.string().url().optional().or(z.literal("")),
  game_id: z.string().uuid("Sélectionne un jeu."),
});

export type EventFormValues = z.infer<typeof eventSchema>;