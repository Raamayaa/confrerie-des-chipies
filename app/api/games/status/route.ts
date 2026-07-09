import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const session = await auth();

  const profileId = (session?.user as any)?.profileId;

  if (!profileId) {
    return NextResponse.json({
      joined: false,
    });
  }

  const { gameId } = await req.json();

  const { data, error } = await supabase
    .from("game_players")
    .select("id")
    .eq("game_id", gameId)
    .eq("profile_id", profileId)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({
    joined: !!data,
  });
}