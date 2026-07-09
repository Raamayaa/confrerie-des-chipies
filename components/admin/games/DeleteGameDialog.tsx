"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type Props = {
  name: string;
  action: () => Promise<void>;
};

export default function DeleteGameDialog({
  name,
  action,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            Supprimer
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer {name} ?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={action}>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Annuler
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              variant="destructive"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}