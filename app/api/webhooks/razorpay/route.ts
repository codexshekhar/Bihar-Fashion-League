import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || "";
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");
    
    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    
    const payload = JSON.parse(body);
    const supabase = await createClient();
    
    // Check if event already processed
    const { data: existing } = await supabase
      .from("payment_events")
      .select("*")
      .eq("provider_event_id", payload.event_id)
      .single();
    
    if (existing) {
      return NextResponse.json({ status: "already_processed" });
    }
    
    await supabase.from("payment_events").insert({
      provider_event_id: payload.event_id,
      event_type: payload.event,
      razorpay_order_id: payload.payload.payment?.entity?.order_id,
      razorpay_payment_id: payload.payload.payment?.entity?.id,
      processing_status: "processed",
      processed_at: new Date().toISOString(),
    });
    
    if (payload.event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const { data: application } = await supabase
        .from("model_applications")
        .select("*")
        .eq("razorpay_order_id", payment.order_id)
        .single();
      
      if (application && application.payment_status !== "paid") {
        await supabase
          .from("model_applications")
          .update({
            payment_status: "paid",
            razorpay_payment_id: payment.id,
            paid_at: new Date().toISOString(),
            application_status: "submitted",
          })
          .eq("id", application.id);
      }
    }
    
    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
