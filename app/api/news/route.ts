import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
