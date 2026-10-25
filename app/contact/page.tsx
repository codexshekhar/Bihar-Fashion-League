"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Camera } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      element.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const CONTACT_INFO = {
  email: "piyush@biharfashionleague.com",
  phone: "6207330072, 8709363167, 8210501502",
  location: "Patna, Bihar, India",
  instagram: "https://www.instagram.com/biharfashionleague",
};

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useReveal();
  const formRef = useReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("hero-revealed");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data?.error ? (Array.isArray(data.error) ? data.error[0]?.message : data.error) : "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again.");
    }
  };

  return (
    <main className="relative bg-[#F8F7F0]">
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 700ms ease, transform 700ms ease;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-fade {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 900ms ease, transform 900ms ease;
        }
        .hero-revealed .hero-fade {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-revealed .hero-fade-delay-1 {
          transition-delay: 120ms;
        }
        .hero-revealed .hero-fade-delay-2 {
          transition-delay: 220ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .hero-fade {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <Header />

      <section className="relative pt-28 sm:pt-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="relative overflow-hidden min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center text-center">
            <div className="absolute inset-0">
              <img
                src="/images/BFL_2025_16.jpeg"
                alt="Bihar Fashion League contact"
                className="h-full w-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/55" />
            </div>
            <div className="relative z-10 px-4 max-w-3xl">
              <p className="hero-fade text-xs tracking-[0.32em] uppercase text-white/80 mb-5">
                GET IN TOUCH
              </p>
              <h1 className="hero-fade hero-fade-delay-1 font-serif text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.95] text-white mb-6">
                Let&apos;s Start a Conversation
              </h1>
              <p className="hero-fade hero-fade-delay-2 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Whether you&apos;re interested in participating, partnering with BFL, or learning more about our events, we&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div ref={infoRef} className="reveal lg:col-span-5">
              <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-5">GET IN TOUCH</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#171717] mb-5">
                Get in Touch
              </h2>
              <p className="text-base leading-relaxed text-[#66645F] mb-10 max-w-md">
                Have questions about participation, partnerships, or press coverage? We&apos;d love to hear from you.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 pb-6 border-b border-[#E5E2DC]">
                  <Mail className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#171717] mb-1">Email</p>
                    <a href="mailto:piyush@biharfashionleague.com" className="text-base text-[#66645F] hover:text-[#171717] transition-colors">
                      piyush@biharfashionleague.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-6 border-b border-[#E5E2DC]">
                  <Phone className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#171717] mb-1">Phone</p>
                    <div className="space-y-1">
                      <a href="tel:6207330072" className="block text-base text-[#66645F] hover:text-[#171717] transition-colors">6207330072</a>
                      <a href="tel:8709363167" className="block text-base text-[#66645F] hover:text-[#171717] transition-colors">8709363167</a>
                      <a href="tel:8210501502" className="block text-base text-[#66645F] hover:text-[#171717] transition-colors">8210501502</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-6 border-b border-[#E5E2DC]">
                  <MapPin className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#171717] mb-1">Location</p>
                    <p className="text-base text-[#66645F]">Patna, Bihar, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Camera className="h-5 w-5 text-[#66645F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#171717] mb-1">Instagram</p>
                    <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-base text-[#66645F] hover:text-[#171717] transition-colors">
                      @biharfashionleague
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs tracking-[0.28em] uppercase text-[#66645F]">QUICK LINKS</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register/model" className="text-sm text-[#66645F] hover:text-[#171717] transition-colors underline-offset-4 hover:underline">
                    Model Registration
                  </Link>
                  <Link href="/partners" className="text-sm text-[#66645F] hover:text-[#171717] transition-colors underline-offset-4 hover:underline">
                    Partnership Inquiries
                  </Link>
                  <Link href="/events" className="text-sm text-[#66645F] hover:text-[#171717] transition-colors underline-offset-4 hover:underline">
                    Event Updates
                  </Link>
                </div>
              </div>
            </div>

            <div ref={formRef} className="reveal lg:col-span-6 lg:col-start-7">
              <div className="border-t border-[#E5E2DC] pt-8 lg:border-t-0 lg:pt-0">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mb-3">Send Us a Message</h2>
                <p className="text-base text-[#66645F] mb-8">
                  Tell us how we can help, and we&apos;ll direct your inquiry to the right team.
                </p>

                {status === "success" ? (
                  <div className="p-6 border border-[#E5E2DC] bg-white">
                    <p className="text-base text-[#171717] mb-2">Message sent successfully.</p>
                    <p className="text-sm text-[#66645F]">We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-[#171717]">Full Name</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-11 px-4 border border-[#E5E2DC] bg-white text-[#171717] text-sm focus:outline-none focus:ring-1 focus:ring-[#171717] transition-shadow"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#171717]">Email</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-11 px-4 border border-[#E5E2DC] bg-white text-[#171717] text-sm focus:outline-none focus:ring-1 focus:ring-[#171717] transition-shadow"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-[#171717]">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 px-4 border border-[#E5E2DC] bg-white text-[#171717] text-sm focus:outline-none focus:ring-1 focus:ring-[#171717] transition-shadow"
                      >
                        <option>General Inquiry</option>
                        <option>Model Registration</option>
                        <option>Partnership and Sponsorship</option>
                        <option>Event Information</option>
                        <option>Media and Press</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-[#171717]">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E2DC] bg-white text-[#171717] text-sm focus:outline-none focus:ring-1 focus:ring-[#171717] transition-shadow resize-none"
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-600">{errorMsg}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-11 bg-[#171717] text-white hover:bg-[#171717]/90 text-sm tracking-wide disabled:opacity-50"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
