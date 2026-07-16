"use client";

import { useTransition } from "react";
import { LogIn } from "lucide-react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const [loading, startTransition] = useTransition();

  function handleLogin() {
    startTransition(async () => {
      await signIn("discord", {
  callbackUrl: "/profile",
});
    });
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
      className="gap-2"
    >
      <LogIn className="h-4 w-4" />

      {loading
        ? "Connexion..."
        : "Se connecter avec Discord"}
    </Button>
  );
}