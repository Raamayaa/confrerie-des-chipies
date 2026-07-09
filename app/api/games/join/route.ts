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

  // Vérifie si le joueur participe déjà
  const { data: existing, error: selectError } = await supabaseAdmin
    .from("game_players")
    .select("id")
    .eq("game_id", gameId)
    .eq("profile_id", profileId)
    .maybeSingle();

  if (selectError) {
    return NextResponse.json(
      { error: selectError.message },
      { status: 400 }
    );
  }

  if (existing) {
    return NextResponse.json({
      success: true,
      alreadyJoined: true,
    });
  }

  // Inscription
  const { error } = await supabaseAdmin
    .from("game_players")
    .insert({
      game_id: gameId,
      profile_id: profileId,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // Récupère le nom du jeu
  const { data: game } = await supabaseAdmin
    .from("games")
    .select("name")
    .eq("id", gameId)
    .single();

  // Enregistre l'activité
  await ActivityService.create(
    profileId,
    "join_game",
    `A rejoint ${game?.name ?? "un jeu"}`
  );

  return NextResponse.json({
    success: true,
    alreadyJoined: false,
  });
}