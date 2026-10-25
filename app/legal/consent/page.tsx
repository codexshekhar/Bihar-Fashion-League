import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Photo & Video Consent | Bihar Fashion League",
  description: "Bihar Fashion League photo and video consent policy.",
};

export default function ConsentPage() {
  return (
    <main className="bg-white">
      <Header />
      <Section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Photo &amp; Video Consent Policy</h1>
          <div className="prose text-muted-foreground max-w-none">
            <p>Bihar Fashion League may capture photographs and video during events for promotional and archival purposes.</p>
            <p className="mt-6">For participants who are minors, guardian consent is required before publishing any identifying imagery.</p>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
