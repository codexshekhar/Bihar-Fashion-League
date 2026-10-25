import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Register | Bihar Fashion League",
  description: "Register to participate in Bihar Fashion League events.",
};

const CATEGORIES = [
  "Runway Model",
  "Showstopper",
  "Designer",
  "Kids' Fashion",
  "Special Performance",
  "Other",
];

const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
];

export default function RegisterPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Register Now</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Join Bihar Fashion League as a participant and showcase your talent on the runway.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form action="/api/registration-applications" method="POST" className="space-y-6 bg-white p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold mb-2">Application Form</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Fill in your details to apply for participation in Bihar Fashion League events.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input type="text" name="name" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input type="email" name="email" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input type="tel" name="phone" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="+91 XXXXX XXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Participation Category</label>
                <select name="category" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Experience Level</label>
                <select name="experience_level" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="">Select experience level</option>
                  {EXPERIENCE_LEVELS.map((exp) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tell Us About Yourself</label>
                <textarea name="message" rows={4} required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Share your background, portfolio, or any relevant experience..." />
              </div>

              <button type="submit" className="w-full rounded-xl border border-input bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
