import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const partnershipSchema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interest: z.string().min(2, "Interest is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((v) => v === true, "Consent is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = partnershipSchema.parse(body);

    const supabase = await createClient();
    const { error } = await supabase.from("partnership_inquiries").insert({
      contact_name: validated.contactName,
      organization: validated.organization,
      email: validated.email,
      phone: validated.phone,
      interest: validated.interest,
      message: validated.message,
      consent: validated.consent,
    });

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
