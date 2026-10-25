import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "public/data/photo-mappings.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageId, updates } = body;

    if (!imageId || !updates) {
      return NextResponse.json({ error: "Missing imageId or updates" }, { status: 400 });
    }

    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const mappings = JSON.parse(raw);

    const index = mappings.findIndex((m: any) => m.imageId === imageId);
    if (index === -1) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    mappings[index] = {
      ...mappings[index],
      ...updates,
      reviewedAt: updates.verificationStatus !== mappings[index].verificationStatus
        ? new Date().toISOString()
        : mappings[index].reviewedAt,
    };

    await fs.writeFile(DATA_FILE, JSON.stringify(mappings, null, 2));

    return NextResponse.json({ success: true, mapping: mappings[index] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update photo mapping" }, { status: 500 });
  }
}
