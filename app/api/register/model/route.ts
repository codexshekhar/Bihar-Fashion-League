import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { modelRegistrationSchema, calculateAge } from "@/lib/validation/model-registration";
import { generateApplicationNumber } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = modelRegistrationSchema.parse(body);
    
    const age = calculateAge(validated.dateOfBirth);
    const isMinor = age < 18;
    
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
        height_inches: validated.heightInches,
        weight_kg: validated.weightKg || null,
        dress_size: validated.dressSize,
        shoe_size: validated.shoeSize,
        instagram_handle: validated.instagramHandle || null,
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
        guardian_relationship: validated.guardianRelationship || null,
        guardian_phone: validated.guardianPhone || null,
        guardian_email: validated.guardianEmail || null,
        guardian_consent_status: isMinor ? (validated.guardianConsent ? 'granted' : 'pending') : 'not_required',
        guardian_consent_at: isMinor && validated.guardianConsent ? new Date().toISOString() : null,
        terms_version: '1.0',
        privacy_notice_version: '1.0',
        consent_recorded_at: new Date().toISOString(),
        application_status: isMinor && !validated.guardianConsent ? 'under_review' : 'awaiting_payment',
        payment_status: 'pending',
        amount_paise: 50000,
        currency: 'INR',
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, applicationId: data.id, applicationNumber: data.application_number });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
