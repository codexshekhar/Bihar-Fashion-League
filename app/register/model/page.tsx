"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ModelRegistrationPage() {
  return (
    <main className="relative bg-[#F8F7F0]">
      <Header />

      <section className="relative pt-32 sm:pt-36 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">BIHAR FASHION LEAGUE</p>
            <h1 className="font-serif text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.95] text-[#171717] mb-6">
              Model Registration
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#66645F] max-w-2xl">
              Apply to participate in Bihar Fashion League. Complete the application form to submit your registration.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="border-t border-[#E5E2DC] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] mb-2">Start Your Application</h2>
              <p className="text-base text-[#66645F]">
                Fill in your details, upload documents as prompted, and submit your application.
              </p>
            </div>
            <Button asChild className="h-11 px-7 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide">
              <Link href="/register/model/apply">
                Start Application <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
