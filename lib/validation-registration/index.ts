import { z } from "zod";

export const calculateAge = (dob: string): number => {
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
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine((dob) => {
    return new Date(dob) <= new Date();
  }, "Date of birth cannot be in the future"),
  gender: z.enum(["Male", "Female", "Other"]),
  contactNumber: z.string().regex(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  whatsappNumber: z.string().regex(/^[0-9]{10}$/, "WhatsApp number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  heightInches: z.number().min(48, "Height must be at least 48 inches").max(96, "Height must be less than 96 inches"),
  weightKg: z.number().optional(),
  dressSize: z.string().min(1, "Dress size is required"),
  shoeSize: z.string().min(1, "Shoe size is required"),
  instagramId: z.string().optional(),
  experienceLevel: z.enum(["Fresher", "Experienced"]),
  previousExperience: z.string().optional(),
  interests: z.string().min(5, "Interests must be at least 5 characters"),
  hobbies: z.string().min(5, "Hobbies must be at least 5 characters"),
  portfolioAvailable: z.enum(["Yes", "No"]),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactNumber: z.string().regex(/^[0-9]{10}$/, "Emergency contact number must be 10 digits"),
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianConsent: z.boolean().optional(),
  infoAccurate: z.boolean().refine((v) => v === true, "You must confirm information is accurate"),
  termsAgreement: z.boolean().refine((v) => v === true, "You must agree to terms"),
  privacyConsent: z.boolean().refine((v) => v === true, "You must agree to privacy notice"),
  documentsLaterConsent: z.boolean().refine((v) => v === true, "You must acknowledge document submission later"),
}).superRefine((data, ctx) => {
  const age = calculateAge(data.dateOfBirth);
  if (age < 18) {
    if (!data.guardianName || data.guardianName.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianName"], message: "Guardian name required for applicants under 18" });
    }
    if (!data.guardianRelation || data.guardianRelation.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianRelation"], message: "Guardian relation required for applicants under 18" });
    }
    if (!data.guardianPhone || data.guardianPhone.trim() === "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianPhone"], message: "Guardian phone required for applicants under 18" });
    }
    if (data.guardianConsent !== true) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["guardianConsent"], message: "Guardian consent required for applicants under 18" });
    }
  }
  if (data.experienceLevel === "Experienced" && (!data.previousExperience || data.previousExperience.trim() === "")) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["previousExperience"], message: "Previous experience required for experienced applicants" });
  }
});

export type ModelRegistrationData = z.infer<typeof modelRegistrationSchema>;
