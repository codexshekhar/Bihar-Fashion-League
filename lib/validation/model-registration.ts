import { z } from "zod";

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const modelRegistrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine((dob) => {
    const birthDate = new Date(dob);
    return birthDate <= new Date();
  }, "Date of birth cannot be in the future"),
  contactNumber: z.string().regex(/^[0-9]{10}$/, "Invalid contact number"),
  whatsappNumber: z.string().regex(/^[0-9]{10}$/, "Invalid WhatsApp number"),
  sameAsContact: z.boolean().optional(),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Female", "Male", "Other", "Prefer not to say"]),
  city: z.string().min(2, "City is required"),
  heightInches: z.number().min(48, "Height must be at least 48 inches").max(96, "Height must be less than 96 inches"),
  weightKg: z.number().optional(),
  dressSize: z.string().min(1, "Dress size is required"),
  shoeSize: z.string().min(1, "Shoe size is required"),
  instagramHandle: z.string().optional(),
  experienceLevel: z.enum(["Fresher", "Experienced"]),
  previousExperience: z.string().optional(),
  interests: z.string().min(5, "Please specify your interests"),
  hobbies: z.string().min(5, "Please specify your hobbies"),
  portfolioAvailable: z.enum(["Yes", "No"]),
  portfolioUrl: z.string().optional(),
  residentialAddress: z.string().min(10, "Address is required"),
  emergencyContactName: z.string().min(2, "Name is required"),
  emergencyContactNumber: z.string().regex(/^[0-9]{10}$/, "Invalid emergency contact number"),
  guardianName: z.string().optional(),
  guardianRelationship: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().email().optional().or(z.literal("")),
  guardianConsent: z.boolean().optional(),
  termsConsent: z.boolean().refine((v) => v === true, "You must agree to the terms"),
  privacyConsent: z.boolean().refine((v) => v === true, "You must agree to the privacy notice"),
  infoAccurateConsent: z.boolean().refine((v) => v === true, "You must confirm the information is accurate"),
  documentLaterConsent: z.boolean().refine((v) => v === true, "You must acknowledge document submission later"),
}).superRefine((data, ctx) => {
  const age = calculateAge(data.dateOfBirth);
  if (age < 18) {
    if (!data.guardianName || data.guardianName.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianName"], message: "Guardian name is required for applicants under 18" });
    }
    if (!data.guardianRelationship || data.guardianRelationship.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianRelationship"], message: "Relationship is required for applicants under 18" });
    }
    if (!data.guardianPhone || data.guardianPhone.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianPhone"], message: "Guardian phone is required for applicants under 18" });
    }
    if (data.guardianConsent !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianConsent"], message: "Guardian consent is required for applicants under 18" });
    }
  }
  if (data.experienceLevel === "Experienced" && (!data.previousExperience || data.previousExperience.trim() === "")) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["previousExperience"], message: "Please describe your previous experience" });
  }
  if (data.portfolioAvailable === "Yes" && data.portfolioUrl && data.portfolioUrl.trim() !== "") {
    try {
      new URL(data.portfolioUrl);
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["portfolioUrl"], message: "Invalid portfolio URL" });
    }
  }
});

export { calculateAge };
export type ModelRegistrationData = z.infer<typeof modelRegistrationSchema>;
