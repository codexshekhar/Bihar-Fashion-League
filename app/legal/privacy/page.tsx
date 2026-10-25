import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Privacy Policy | Bihar Fashion League",
  description: "Bihar Fashion League privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Header />
      <Section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          <div className="prose text-muted-foreground max-w-none">
            <p>This Privacy Policy describes how Bihar Fashion League collects, uses, and protects your personal information.</p>
            <p className="mt-6">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
