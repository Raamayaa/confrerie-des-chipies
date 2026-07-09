import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { ActivityService } from "@/lib/services/activity.service";

export async function POST(req: Request) {
  const session = await auth();

  const profileId = (session?.user as any)?.profileId;

  if (!profileId) {
    return NextResponse.json(
      { error: "Utilisateur non connecté." },
      { status: 401 }
    );
  }

  const { gameId } = await req.json();

  // Récupère le nom du jeu avant la suppression
  const { data: game } = await supabaseAdmin
    .from("games")
    .select("name")
    .eq("id", gameId)
    .single();

  // Supprime la participation
  const { error } = await supabaseAdmin
    .from("game_players")
    .delete()
    .eq("game_id", gameId)
    .eq("profile_id", profileId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Ajoute une activité
  await ActivityService.create(
    profileId,
    "leave_game",
    `A quitté ${game?.name ?? "un jeu"}`
  );

  return NextResponse.json({
    success: true,
  });
}