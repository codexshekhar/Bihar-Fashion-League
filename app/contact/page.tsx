import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact | Bihar Fashion League",
  description: "Get in touch with Bihar Fashion League - contact form, social links, and partnership inquiries.",
};

const CONTACT_INFO = {
  email: "contact@biharfashionleague.in",
  phone: "+91 XXXXX XXXX",
  address: "Patna, Bihar, India",
};

export default function ContactPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_16.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Contact Us</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Reach out to Bihar Fashion League for participation, partnership, or media inquiries.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Have questions about participation, partnerships, or press coverage? We'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 011 1.186l5.625 8.438a1 1 0 01-.054 1.352L19.15 18.186a1 1 0 01-1.352.054l-5.625-8.438A1 1 0 0112.28 5H13a2 2 0 012-2zM3 13a2 2 0 012-2h1.07A2 2 0 017.07 13H5a2 2 0 01-2-2zM9 21v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zM17 21v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="https://instagram.com/biharfashionleague" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </a>
                <a href="https://linkedin.com/company/biharfashionleague" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 0v11h-3z"></path></svg>
                </a>
                <a href="https://twitter.com/biharfashionleague" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A10.48 10.48 0 0023 3z"></path></svg>
                </a>
              </div>
            </div>

            <form action="/api/contact" method="POST" className="space-y-6 bg-white p-8 rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We typically respond within 2-3 business days.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <input type="text" name="name" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input type="email" name="email" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <select name="subject" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>General Inquiry</option>
                  <option>Participation</option>
                  <option>Partnership</option>
                  <option>Press &amp; Media</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea name="message" rows={4} required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <button type="submit" className="w-full rounded-xl border border-input bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
