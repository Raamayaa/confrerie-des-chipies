"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  eventSchema,
  type EventFormValues,
} from "@/lib/validators/event";

type Game = {
  id: string;
  name: string;
};

type Props = {
  games: Game[];
  defaultValues?: Partial<EventFormValues>;
  action: (formData: FormData) => void;
};

export default function EventForm({
  games,
  defaultValues,
  action,
}: Props) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      event_date: defaultValues?.event_date ?? "",
      discord_link: defaultValues?.discord_link ?? "",
      game_id: defaultValues?.game_id ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        action={action}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>

              <FormControl>
                <Input
                  placeholder="Soirée Minecraft"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="game_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jeu</FormLabel>

              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-md border bg-background px-3 py-2"
                >
                  <option value="">
                    Sélectionner un jeu
                  </option>

                  {games.map((game) => (
                    <option
                      key={game.id}
                      value={game.id}
                    >
                      {game.name}
                    </option>
                  ))}
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>

              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discord_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien Discord</FormLabel>

              <FormControl>
                <Input
                  placeholder="https://discord.gg/..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
        >
          Enregistrer
        </Button>
      </form>
    </Form>
  );
}