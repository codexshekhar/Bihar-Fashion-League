import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

function generateSecureToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(request: Request) {
  try {
    const { applicationId } = await request.json();
    const token = generateSecureToken();
    const tokenHash = hashToken(token);
    
    const supabase = await createClient();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    await supabase.from("document_requests").insert({
      application_id: applicationId,
      document_type: "photo_closeup",
      request_status: "pending",
      secure_upload_token_hash: tokenHash,
      expires_at: expiresAt.toISOString(),
    });
    
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
