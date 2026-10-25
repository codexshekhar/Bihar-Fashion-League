"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CATEGORY_FEES, CATEGORY_LABELS, modelRegistrationSchema, calculateAge, getFeeForCategory } from "@/lib/validation-registration";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Modelling Details" },
  { id: 3, name: "Interests & Portfolio" },
  { id: 4, name: "Address & Emergency Contact" },
  { id: 5, name: "Review & Consent" },
  { id: 6, name: "Payment" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

// Regex patterns defined as constants to avoid inline regex literal parsing issues
const phoneRegex = new RegExp("^[0-9]{10}$");
const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  city: string;
  address: string;
  residentialAddress: string;
  heightInches: number;
  weightKg?: number;
  dressSize: string;
  shoeSize: string;
  instagramId: string;
  experienceLevel: "Fresher" | "Experienced";
  previousExperience: string;
  interests: string;
  hobbies: string;
  portfolioAvailable: "Yes" | "No";
  portfolioUrl: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  category: "kids" | "other";
  guardianName?: string;
  guardianRelation?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianConsent?: boolean;
  infoAccurate: boolean;
  termsAgreement: boolean;
  privacyConsent: boolean;
  documentsLaterConsent: boolean;
}

export type { FormData };

const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  gender: "Male",
  contactNumber: "",
  whatsappNumber: "",
  email: "",
  city: "",
  address: "",
  residentialAddress: "",
  heightInches: 0,
  dressSize: "",
  shoeSize: "",
  instagramId: "",
  experienceLevel: "Fresher",
  previousExperience: "",
  interests: "",
  hobbies: "",
  portfolioAvailable: "No",
  portfolioUrl: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  category: "other",
  infoAccurate: false,
  termsAgreement: false,
  privacyConsent: false,
  documentsLaterConsent: false,
};

export default function ApplyPage() {
  const [step, setStep] = useState<StepId>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [feeInfo, setFeeInfo] = useState({ amountPaise: 300000, amountInr: 3000 });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (formData.dateOfBirth) {
      setAge(calculateAge(formData.dateOfBirth));
    } else {
      setAge(null);
    }
  }, [formData.dateOfBirth]);

  useEffect(() => {
    const fee = getFeeForCategory(formData.category);
    setFeeInfo(fee);
  }, [formData.category]);

  const updateField = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const goNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < 6) {
      setStep((s) => (s === 6 ? 6 : s + 1) as StepId);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((s) => s - 1 as StepId);
    }
  };

  const validateStep = (currentStep: StepId): Record<string, string> => {
    const errs: Record<string, string> = {};
    const { fullName, dateOfBirth, gender, contactNumber, whatsappNumber, email, city, address, heightInches, dressSize, shoeSize, experienceLevel, previousExperience, interests, hobbies, portfolioAvailable, portfolioUrl, residentialAddress, emergencyContactName, emergencyContactNumber, category, guardianName, guardianRelation, guardianPhone, guardianConsent, infoAccurate, termsAgreement, privacyConsent, documentsLaterConsent } = formData;

    switch (currentStep) {
      case 1:
        if (!fullName.trim()) errs.fullName = "Full name is required";
        if (!dateOfBirth) errs.dateOfBirth = "Date of birth is required";
        else if (new Date(dateOfBirth) > new Date()) errs.dateOfBirth = "Date of birth cannot be in the future";
        if (!gender) errs.gender = "Please select gender";
        if (!contactNumber.trim()) errs.contactNumber = "Contact number is required";
        else if (!phoneRegex.test(contactNumber)) errs.contactNumber = "Contact number must be 10 digits";
        if (!whatsappNumber.trim()) errs.whatsappNumber = "WhatsApp number is required";
        else if (!phoneRegex.test(whatsappNumber)) errs.whatsappNumber = "WhatsApp number must be 10 digits";
        if (!email.trim()) errs.email = "Email is required";
        else if (!emailRegex.test(email)) errs.email = "Invalid email address";
        if (!city.trim()) errs.city = "City is required";
        break;
      case 2:
        if (!heightInches || heightInches < 48 || heightInches > 96) errs.heightInches = "Height must be between 48 and 96 inches";
        if (!dressSize.trim()) errs.dressSize = "Dress size is required";
        if (!shoeSize.trim()) errs.shoeSize = "Shoe size is required";
        if (!experienceLevel) errs.experienceLevel = "Please select experience level";
        if (experienceLevel === "Experienced" && !previousExperience.trim()) {
          errs.previousExperience = "Please describe your previous experience";
        }
        break;
      case 3:
        if (!interests.trim()) errs.interests = "Interests are required";
        if (!hobbies.trim()) errs.hobbies = "Hobbies are required";
        if (portfolioAvailable === "Yes" && !portfolioUrl.trim()) {
          errs.portfolioUrl = "Portfolio URL is required";
        } else if (portfolioUrl.trim()) {
          try { new URL(portfolioUrl); } catch { errs.portfolioUrl = "Invalid URL"; }
        }
        break;
      case 4:
        if (!residentialAddress.trim()) errs.residentialAddress = "Address is required";
        if (!emergencyContactName.trim()) errs.emergencyContactName = "Emergency contact name is required";
        if (!emergencyContactNumber.trim()) errs.emergencyContactNumber = "Emergency contact number is required";
        else if (!phoneRegex.test(emergencyContactNumber)) {
          errs.emergencyContactNumber = "Emergency contact must be 10 digits";
        }
        if (age !== null && age < 18) {
          if (!guardianName?.trim()) errs.guardianName = "Guardian name is required";
          if (!guardianRelation?.trim()) errs.guardianRelation = "Guardian relation is required";
          if (!guardianPhone?.trim()) errs.guardianPhone = "Guardian phone is required";
          if (guardianConsent !== true) errs.guardianConsent = "Guardian consent is required";
        }
        break;
      case 5:
        if (!infoAccurate) errs.infoAccurate = "You must confirm information is accurate";
        if (!termsAgreement) errs.termsAgreement = "You must agree to terms";
        if (!privacyConsent) errs.privacyConsent = "You must agree to privacy notice";
        if (!documentsLaterConsent) errs.documentsLaterConsent = "You must acknowledge document submission later";
        break;
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validateStep(5);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setStep(5);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register/model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount_paise: feeInfo.amountPaise,
          currency: "INR",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push(`/register/confirmation/${data.applicationNumber}`);
      } else {
        setSubmitError(data.error || "Failed to submit application");
      }
    } catch (err) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-[#FAFAF9] min-h-screen">
      <Header />

      <section className="bg-white border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Model Registration</h1>
            <p className="text-lg text-muted-foreground">
              Bihar Fashion League 2026 &mdash; Apply to join the platform
            </p>
          </div>

          <div className="mt-10 relative">
            <div className="flex items-center justify-between">
              {STEPS.map((s, idx) => (
                <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border transition-all ${
                    step > s.id ? "bg-primary text-white border-primary" :
                    step === s.id ? "bg-primary text-white border-primary" :
                    "bg-white border-border text-muted-foreground"
                  }`}>
                    {step > s.id ? <Check className="h-5 w-5" /> : idx + 1}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    step > s.id || step === s.id ? "text-primary" : "text-muted-foreground"
                  }`}>{s.name}</span>
                  {idx < STEPS.length - 1 && (
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-[2px] w-[40px] ${
                      step > s.id + 1 ? "bg-primary" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="px-6 py-3 rounded-xl border border-border bg-white flex items-center gap-4 shadow-sm">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Registration Fee
              </span>
              <span className="text-2xl font-bold text-primary">
                ₹{feeInfo.amountInr.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">
                {formData.category === "kids" ? "Kids Category" : "All Other Categories"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-border shadow-sm">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Personal Details</h2>
                <p className="text-muted-foreground">Tell us about yourself.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
                      Date of Birth <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateField("dateOfBirth", e.target.value)}
                      className={errors.dateOfBirth ? "border-destructive" : ""}
                    />
                    {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth}</p>}
                    {age && (
                      <p className="text-xs text-muted-foreground">Age: {age} years</p>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <label htmlFor="gender" className="text-sm font-medium text-foreground">
                    Gender <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={(e) => updateField("gender", e.target.value as any)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="contactNumber" className="text-sm font-medium text-foreground">
                      Contact Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => updateField("contactNumber", e.target.value)}
                      placeholder="10 digit number"
                      className={errors.contactNumber ? "border-destructive" : ""}
                    />
                    {errors.contactNumber && <p className="text-xs text-destructive">{errors.contactNumber}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="whatsappNumber" className="text-sm font-medium text-foreground">
                      WhatsApp Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => updateField("whatsappNumber", e.target.value)}
                      placeholder="10 digit number"
                      className={errors.whatsappNumber ? "border-destructive" : ""}
                    />
                    {errors.whatsappNumber && <p className="text-xs text-destructive">{errors.whatsappNumber}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="city" className="text-sm font-medium text-foreground">
                      City <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Your city"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Modelling Details</h2>
                <p className="text-muted-foreground">Share your physical stats and experience.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="heightInches" className="text-sm font-medium text-foreground">
                      Height (inches) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="heightInches"
                      type="number"
                      value={formData.heightInches || ""}
                      onChange={(e) => updateField("heightInches", Number(e.target.value))}
                      placeholder="e.g. 64"
                      className={errors.heightInches ? "border-destructive" : ""}
                    />
                    {errors.heightInches && <p className="text-xs text-destructive">{errors.heightInches}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="weightKg" className="text-sm font-medium text-foreground">
                      Weight (kg)
                    </label>
                    <Input
                      id="weightKg"
                      type="number"
                      value={formData.weightKg || ""}
                      onChange={(e) => updateField("weightKg", e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="dressSize" className="text-sm font-medium text-foreground">
                      Dress Size <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="dressSize"
                      value={formData.dressSize}
                      onChange={(e) => updateField("dressSize", e.target.value)}
                      placeholder="e.g. M, 32"
                      className={errors.dressSize ? "border-destructive" : ""}
                    />
                    {errors.dressSize && <p className="text-xs text-destructive">{errors.dressSize}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="shoeSize" className="text-sm font-medium text-foreground">
                      Shoe Size <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="shoeSize"
                      value={formData.shoeSize}
                      onChange={(e) => updateField("shoeSize", e.target.value)}
                      placeholder="e.g. 7, 8"
                      className={errors.shoeSize ? "border-destructive" : ""}
                    />
                    {errors.shoeSize && <p className="text-xs text-destructive">{errors.shoeSize}</p>}
                  </div>
                </div>
                <div className="space-y-3">
                  <label htmlFor="instagramId" className="text-sm font-medium text-foreground">
                    Instagram ID
                  </label>
                  <Input
                    id="instagramId"
                    value={formData.instagramId}
                    onChange={(e) => updateField("instagramId", e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="experienceLevel" className="text-sm font-medium text-foreground">
                    Experience Level <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-4">
                    {["Fresher", "Experienced"].map((lvl) => (
                      <label key={lvl} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="experienceLevel"
                          value={lvl}
                          checked={formData.experienceLevel === lvl}
                          onChange={(e) => updateField("experienceLevel", e.target.value as any)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {lvl}
                      </label>
                    ))}
                  </div>
                  {errors.experienceLevel && <p className="text-xs text-destructive">{errors.experienceLevel}</p>}
                </div>
                {formData.experienceLevel === "Experienced" && (
                  <div className="space-y-3">
                    <label htmlFor="previousExperience" className="text-sm font-medium text-foreground">
                      Previous Experience <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="previousExperience"
                      rows={3}
                      value={formData.previousExperience}
                      onChange={(e) => updateField("previousExperience", e.target.value)}
                      placeholder="Describe your modelling or event experience"
                      className={errors.previousExperience ? "border-destructive" : "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"}
                    />
                    {errors.previousExperience && <p className="text-xs text-destructive">{errors.previousExperience}</p>}
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Interests & Portfolio</h2>
                <p className="text-muted-foreground">What are you passionate about?</p>

                <div className="space-y-3">
                  <label htmlFor="interests" className="text-sm font-medium text-foreground">
                    Areas of Interest <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="interests"
                    rows={3}
                    value={formData.interests}
                    onChange={(e) => updateField("interests", e.target.value)}
                    placeholder="e.g. Runway, Editorial, Commercial"
                    className={errors.interests ? "border-destructive" : "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"}
                  />
                  {errors.interests && <p className="text-xs text-destructive">{errors.interests}</p>}
                </div>
                <div className="space-y-3">
                  <label htmlFor="hobbies" className="text-sm font-medium text-foreground">
                    Hobbies <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="hobbies"
                    rows={3}
                    value={formData.hobbies}
                    onChange={(e) => updateField("hobbies", e.target.value)}
                    placeholder="What do you enjoy doing?"
                    className={errors.hobbies ? "border-destructive" : "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"}
                  />
                  {errors.hobbies && <p className="text-xs text-destructive">{errors.hobbies}</p>}
                </div>
                <div className="space-y-3">
                  <label htmlFor="portfolioAvailable" className="text-sm font-medium text-foreground">
                    Do you have a portfolio? <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-4">
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="portfolioAvailable"
                          value={opt}
                          checked={formData.portfolioAvailable === opt}
                          onChange={(e) => {
                            updateField("portfolioAvailable", opt as any);
                            if (opt === "No") updateField("portfolioUrl", "");
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.portfolioAvailable && <p className="text-xs text-destructive">{errors.portfolioAvailable}</p>}
                </div>
                {formData.portfolioAvailable === "Yes" && (
                  <div className="space-y-3">
                    <label htmlFor="portfolioUrl" className="text-sm font-medium text-foreground">
                      Portfolio URL
                    </label>
                    <Input
                      id="portfolioUrl"
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => updateField("portfolioUrl", e.target.value)}
                      placeholder="https://example.com/portfolio"
                      className={errors.portfolioUrl ? "border-destructive" : ""}
                    />
                    {errors.portfolioUrl && <p className="text-xs text-destructive">{errors.portfolioUrl}</p>}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Address & Emergency Contact</h2>
                <p className="text-muted-foreground">We need this for event logistics and safety.</p>

                <div className="space-y-3">
                  <label htmlFor="residentialAddress" className="text-sm font-medium text-foreground">
                    Full Residential Address <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="residentialAddress"
                    rows={3}
                    value={formData.residentialAddress}
                    onChange={(e) => updateField("residentialAddress", e.target.value)}
                    placeholder="Your full address"
                    className={errors.residentialAddress ? "border-destructive" : "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"}
                  />
                  {errors.residentialAddress && <p className="text-xs text-destructive">{errors.residentialAddress}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="emergencyContactName" className="text-sm font-medium text-foreground">
                      Emergency Contact Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) => updateField("emergencyContactName", e.target.value)}
                      placeholder="Parent, guardian, or emergency contact"
                      className={errors.emergencyContactName ? "border-destructive" : ""}
                    />
                    {errors.emergencyContactName && <p className="text-xs text-destructive">{errors.emergencyContactName}</p>}
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="emergencyContactNumber" className="text-sm font-medium text-foreground">
                      Emergency Contact Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="emergencyContactNumber"
                      type="tel"
                      value={formData.emergencyContactNumber}
                      onChange={(e) => updateField("emergencyContactNumber", e.target.value)}
                      placeholder="10 digit number"
                      className={errors.emergencyContactNumber ? "border-destructive" : ""}
                    />
                    {errors.emergencyContactNumber && <p className="text-xs text-destructive">{errors.emergencyContactNumber}</p>}
                  </div>
                </div>

                {(age !== null && age < 18) && (
                  <div className="pt-8 border-t border-border">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="text-primary">🛡️</span>
                      Guardian Consent (Required for Applicants Under 18)
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      As a minor, your parent or legal guardian must consent to your application and the processing
                      of your personal data.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label htmlFor="guardianName" className="text-sm font-medium text-foreground">
                          Guardian Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="guardianName"
                          value={formData.guardianName || ""}
                          onChange={(e) => updateField("guardianName", e.target.value)}
                          placeholder="Parent or guardian name"
                          className={errors.guardianName ? "border-destructive" : ""}
                        />
                        {errors.guardianName && <p className="text-xs text-destructive">{errors.guardianName}</p>}
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="guardianRelation" className="text-sm font-medium text-foreground">
                          Relationship <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="guardianRelation"
                          value={formData.guardianRelation || ""}
                          onChange={(e) => updateField("guardianRelation", e.target.value)}
                          placeholder="e.g. Parent, Legal Guardian"
                          className={errors.guardianRelation ? "border-destructive" : ""}
                        />
                        {errors.guardianRelation && <p className="text-xs text-destructive">{errors.guardianRelation}</p>}
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="guardianPhone" className="text-sm font-medium text-foreground">
                          Guardian Phone <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="guardianPhone"
                          type="tel"
                          value={formData.guardianPhone || ""}
                          onChange={(e) => updateField("guardianPhone", e.target.value)}
                          placeholder="10 digit number"
                          className={errors.guardianPhone ? "border-destructive" : ""}
                        />
                        {errors.guardianPhone && <p className="text-xs text-destructive">{errors.guardianPhone}</p>}
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="guardianEmail" className="text-sm font-medium text-foreground">
                          Guardian Email
                        </label>
                        <Input
                          id="guardianEmail"
                          type="email"
                          value={formData.guardianEmail || ""}
                          onChange={(e) => updateField("guardianEmail", e.target.value)}
                          placeholder="guardian@example.com"
                          className={errors.guardianEmail ? "border-destructive" : ""}
                        />
                        {errors.guardianEmail && <p className="text-xs text-destructive">{errors.guardianEmail}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.guardianConsent === true}
                            onChange={(e) => updateField("guardianConsent", e.target.checked)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          I give consent for this minor&rsquo;s application and data processing
                        </label>
                        {errors.guardianConsent && <p className="text-xs text-destructive">{errors.guardianConsent}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Review & Consent</h2>
                <p className="text-muted-foreground">Review your application before submission.</p>

                <div className="bg-gray-50 p-6 rounded-xl border border-border">
                  <h3 className="font-bold mb-4">Application Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Name</span><p className="font-medium">{formData.fullName}</p></div>
                    <div><span className="text-muted-foreground">Category</span><p className="font-medium">{CATEGORY_LABELS[formData.category]}</p></div>
                    <div><span className="text-muted-foreground">Registration Fee</span><p className="font-medium text-primary">₹{feeInfo.amountInr.toLocaleString()}</p></div>
                    <div><span className="text-muted-foreground">Experience</span><p className="font-medium">{formData.experienceLevel}</p></div>
                    <div><span className="text-muted-foreground">City</span><p className="font-medium">{formData.city}</p></div>
                    <div><span className="text-muted-foreground">Email</span><p className="font-medium">{formData.email}</p></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="infoAccurate"
                      checked={formData.infoAccurate}
                      onChange={(e) => updateField("infoAccurate", e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <label htmlFor="infoAccurate" className="text-sm text-muted-foreground leading-relaxed">
                      I confirm that all information provided is accurate and truthful.
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAgreement"
                      checked={formData.termsAgreement}
                      onChange={(e) => updateField("termsAgreement", e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <label htmlFor="termsAgreement" className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the BFL rules, guidelines, schedules, and professional requirements.
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={(e) => updateField("privacyConsent", e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-muted-foreground leading-relaxed">
                      I acknowledge the privacy notice and consent to processing of my application information.
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="documentsLaterConsent"
                      checked={formData.documentsLaterConsent}
                      onChange={(e) => updateField("documentsLaterConsent", e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <label htmlFor="documentsLaterConsent" className="text-sm text-muted-foreground leading-relaxed">
                      I understand photographs and supporting documents will be requested later through a secure process.
                    </label>
                  </div>
                  {[errors.infoAccurate, errors.termsAgreement, errors.privacyConsent, errors.documentsLaterConsent].filter(Boolean).map((err, idx) => {
                    const key = ["infoAccurate", "termsAgreement", "privacyConsent", "documentsLaterConsent"][idx];
                    return <p key={key} className="text-xs text-destructive">{err}</p>;
                  })}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Payment</h2>
                <p className="text-muted-foreground">Complete your registration with a secure payment.</p>

                <div className="bg-gray-50 p-6 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Registration Fee</span>
                    <span className="font-bold text-primary">₹{feeInfo.amountInr.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{CATEGORY_LABELS[formData.category]}</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      You will be redirected to Razorpay to complete payment securely.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your registration is not complete until payment is verified.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="button"
                    onClick={goBack}
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4"
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Payment"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {submitError && (
                  <div className="mt-4 p-4 rounded-lg border border-destructive/50 bg-destructive/5 text-destructive">
                    {submitError}
                  </div>
                )}
              </div>
            )}

            {step !== 6 && (
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="px-8 py-3"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={goNext}
                  className="px-8 py-3"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
