import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { modelRegistrationSchema, calculateAge, getFeeForCategory } from "@/lib/validation-registration";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = modelRegistrationSchema.parse(body);

    const age = calculateAge(validated.dateOfBirth);
    const isMinor = age < 18;

    // Calculate fee SERVER-SIDE based on category - never trust client amount
    const fee = getFeeForCategory(validated.category);

    const applicationNumber = generateApplicationNumber();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("model_applications")
      .insert({
        application_number: applicationNumber,
        full_name: validated.fullName,
        date_of_birth: validated.dateOfBirth,
        contact_number: validated.contactNumber,
        whatsapp_number: validated.whatsappNumber,
        email: validated.email,
        gender: validated.gender,
        city: validated.city,
        address: validated.residentialAddress || validated.address || null,
        height_inches: validated.heightInches,
        weight_kg: validated.weightKg || null,
        dress_size: validated.dressSize,
        shoe_size: validated.shoeSize,
        instagram_handle: validated.instagramId || null,
        experience_level: validated.experienceLevel,
        previous_experience: validated.previousExperience || null,
        interests: validated.interests,
        hobbies: validated.hobbies,
        portfolio_available: validated.portfolioAvailable,
        portfolio_url: validated.portfolioUrl || null,
        residential_address: validated.residentialAddress,
        emergency_contact_name: validated.emergencyContactName,
        emergency_contact_number: validated.emergencyContactNumber,
        guardian_name: validated.guardianName || null,
        guardian_relationship: validated.guardianRelation || null,
        guardian_phone: validated.guardianPhone || null,
        guardian_email: validated.guardianEmail || null,
        guardian_consent_status: isMinor ? (validated.guardianConsent ? "granted" : "pending") : "not_required",
        guardian_consent_at: isMinor && validated.guardianConsent ? new Date().toISOString() : null,
        terms_version: "1.0",
        privacy_notice_version: "1.0",
        consent_recorded_at: new Date().toISOString(),
        application_status: isMinor && !validated.guardianConsent ? "under_review" : "submitted",
        payment_status: "exempt",
        amount_paise: fee.amountPaise,
        currency: "INR",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      applicationId: data.id,
      applicationNumber: data.application_number,
      category: validated.category,
      amount_paise: fee.amountPaise,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

function generateApplicationNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `BFL${year}${month}${day}-${random}`;
}
