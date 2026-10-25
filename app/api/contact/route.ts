import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    const supabase = await createClient();
    const { error } = await supabase.from("contact_inquiries").insert({
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      message: validated.message,
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
