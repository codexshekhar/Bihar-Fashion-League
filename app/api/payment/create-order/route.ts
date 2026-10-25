import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const { applicationId } = await request.json();
    
    const supabase = await createClient();
    const { data: application, error } = await supabase
      .from("model_applications")
      .select("*")
      .eq("id", applicationId)
      .single();
    
    if (error || !application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    
    if (application.payment_status === "paid") {
      return NextResponse.json({ error: "Already paid" }, { status: 400 });
    }
    
    if (!razorpay) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }
    
    const order = await razorpay.orders.create({
      amount: application.amount_paise,
      currency: application.currency,
      receipt: application.application_number,
      notes: {
        applicationId: application.id,
        applicationNumber: application.application_number,
      },
    });
    
    await supabase
      .from("model_applications")
      .update({ razorpay_order_id: order.id })
      .eq("id", applicationId);
    
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      name: "Bihar Fashion League",
      description: "Model Registration Fee",
      prefill: {
        name: application.full_name,
        email: application.email,
        contact: application.contact_number,
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
