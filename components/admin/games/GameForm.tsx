"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  gameSchema,
  type GameFormValues,
} from "@/lib/validators/game";

type Props = {
  defaultValues?: Partial<GameFormValues>;
  action: (formData: FormData) => void;
};

export default function GameForm({
  defaultValues,
  action,
}: Props) {
  const form = useForm<GameFormValues>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      image: defaultValues?.image ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  const image = form.watch("image");

  return (
    <Form {...form}>
      <form
        action={action}
        className="space-y-8"
      >
        {/* Nom */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du jeu</FormLabel>

              <FormControl>
                <Input
                  placeholder="Minecraft"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image (URL)</FormLabel>

              <FormControl>
                <Input
                  placeholder="https://..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Aperçu */}
        {image && (
          <div className="overflow-hidden rounded-xl border">
            <Image
              src={image}
              alt="Aperçu"
              width={1200}
              height={700}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Décris le jeu..."
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