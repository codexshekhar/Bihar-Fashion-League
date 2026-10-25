import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";

export default function ModelRegistrationPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">BIHAR FASHION LEAGUE 2026</h1>
          <p className="mt-6 text-2xl text-white/90 max-w-2xl mx-auto">Official Model Registration</p>
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
            Apply to participate in Bihar Fashion League 2026. Complete the application carefully and submit the registration fee to complete your application.
            Photographs and supporting documents can be submitted later through the secure follow-up process.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-white p-8 rounded-2xl border border-border mb-8">
            <h2 className="text-2xl font-bold mb-4">Registration Details</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Registration Fee</h3>
                <p className="text-2xl font-bold text-primary">₹500</p>
                <p className="text-sm text-muted-foreground">Payable after submitting the application</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Application Steps</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. Personal Details</li>
                  <li>2. Modelling Details</li>
                  <li>3. Interests & Portfolio</li>
                  <li>4. Address & Emergency Contact</li>
                  <li>5. Review & Consent</li>
                  <li>6. Payment</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                Phone: 6207330072, 8709363167, 8210501502<br />
                Email: piyush@biharfashionleague.com<br />
                Instagram: @Biharfashionleague
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Important Notes</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Photographs and documents can be submitted later</li>
                <li>• If under 18, guardian consent is required</li>
                <li>• Payment is required to complete registration</li>
                <li>• Applications are subject to review</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="px-12">
              <Link href="/register/model/apply">Start Application</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
