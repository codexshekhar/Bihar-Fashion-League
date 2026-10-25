"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ApplicationData {
  applicationNumber: string;
  fullName: string;
  email: string;
  category: string;
}

export default function ConfirmationPage() {
  const params = useParams();
  const token = params.token as string;
  const [data, setData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/register/confirmation?token=${token}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError("Application not found");
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchApplication();
  }, [token]);

  if (loading) {
    return (
      <main className="relative bg-[#F8F7F0]">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[#66645F]">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="relative bg-[#F8F7F0]">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <h1 className="font-serif text-3xl text-[#171717] mb-4">Application Not Found</h1>
            <p className="text-[#66645F] mb-8">The confirmation link is invalid or has expired.</p>
            <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90">
              <Link href="/register/model">Apply Again</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative bg-[#F8F7F0]">
      <Header />
      <section className="pt-32 sm:pt-36 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-[#171717] mx-auto mb-6" />
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">
            Registration Submitted Successfully
          </h1>
          <p className="text-base sm:text-lg text-[#66645F] mb-8 max-w-2xl mx-auto">
            Thank you for applying to Bihar Fashion League. Your registration has been received. Our team will review your application and contact you using the details you provided.
          </p>
          <div className="border border-[#E5E2DC] p-6 sm:p-8 mb-10 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-2">Application Number</p>
                <p className="text-base text-[#171717]">{data.applicationNumber}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-2">Full Name</p>
                <p className="text-base text-[#171717]">{data.fullName}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-2">Email</p>
                <p className="text-base text-[#171717]">{data.email}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.28em] uppercase text-[#66645F] mb-2">Category</p>
                <p className="text-base text-[#171717]">{data.category}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="ghost" className="h-11 px-7 text-[#171717] hover:bg-[#171717]/5">
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
