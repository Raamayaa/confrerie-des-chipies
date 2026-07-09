import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Aucun fichier." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();

  const path = `${uuid()}-${file.name}`;

  const { error } = await supabase.storage
    .from("games")
    .upload(path, bytes, {
      contentType: file.type,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  const { data } = supabase.storage
    .from("games")
    .getPublicUrl(path);

  return NextResponse.json({
    url: data.publicUrl,
  });
}