import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "public/data/photo-mappings.json");

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const mappings = JSON.parse(raw);
    return NextResponse.json({
      total: mappings.length,
      published: mappings.filter(
        (p: any) => p.verificationStatus === "verified" && p.publicationApproved
      ).length,
      pending: mappings.filter(
        (p: any) => p.verificationStatus === "needs_review"
      ).length,
      photos: mappings,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read photo mappings" }, { status: 500 });
  }
}
