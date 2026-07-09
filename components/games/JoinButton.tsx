"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  gameId: string;
};

export default function JoinButton({ gameId }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      if (status === "loading") return;

      if (!session?.user) {
        setChecking(false);
        setJoined(false);
        return;
      }

      try {
        const res = await fetch("/api/games/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId }),
        });

        const result = await res.json();

        setJoined(Boolean(result.joined));
      } catch (error) {
        console.error("Erreur status :", error);
      } finally {
        setChecking(false);
      }
    }

    checkStatus();
  }, [gameId, session, status]);

  async function toggleParticipation() {
    if (!session?.user) {
      alert("Tu dois te connecter avec Discord.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = joined
        ? "/api/games/leave"
        : "/api/games/join";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error ?? "Une erreur est survenue.");
        return;
      }

      setJoined((prev) => !prev);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleParticipation();
      }}
      disabled={loading || checking}
      className={`mt-6 w-full transition-colors ${
        joined
          ? "bg-green-600 hover:bg-red-600 text-white"
          : ""
      }`}
    >
      {checking
        ? "🔎 Vérification..."
        : loading
        ? "⏳ Chargement..."
        : joined
        ? "🚪 Quitter le jeu"
        : "🎮 Je joue"}
    </Button>
  );
}