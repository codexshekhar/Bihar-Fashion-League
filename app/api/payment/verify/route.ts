import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { sendRegistrationConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");
    
    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    
    const supabase = await createClient();
    const { data: application, error } = await supabase
      .from("model_applications")
      .select("*")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();
    
    if (error || !application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    
    if (application.payment_status === "paid") {
      return NextResponse.json({ success: true, alreadyPaid: true });
    }
    
    await supabase
      .from("model_applications")
      .update({
        payment_status: "paid",
        razorpay_payment_id: razorpay_payment_id,
        paid_at: new Date().toISOString(),
        application_status: "submitted",
      })
      .eq("id", application.id);
    
    // Send confirmation email
    await sendRegistrationConfirmationEmail({
      to: application.email,
      name: application.full_name,
      applicationNumber: application.application_number,
      amount: application.amount_paise,
      paymentId: razorpay_payment_id,
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
