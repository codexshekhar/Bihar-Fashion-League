import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Invalid phone number"),
  category: z.string().min(1, "Category is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registrationSchema.parse(body);

    const supabase = await createClient();
    const { error } = await supabase.from("registration_applications").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      category: validated.category,
      experience_level: validated.experienceLevel,
      message: validated.message,
      status: "pending",
    });

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    return Response.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
