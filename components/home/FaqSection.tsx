"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItemData {
  question: string;
  answer: React.ReactNode;
}

const FAQS: FaqItemData[] = [
  {
    question: "How can I register for Bihar Fashion League?",
    answer: (
      <>
        You can begin your application through the official model registration page. Complete the required details, provide the requested information, and submit your application.{" "}
        <Link href="/register/model" className="text-[#171717] underline underline-offset-4 hover:opacity-80">
          Register Now
        </Link>
      </>
    ),
  },
  {
    question: "Who can participate in BFL?",
    answer: "Bihar Fashion League welcomes aspiring fashion talent and individuals interested in runway presentation. Available categories and eligibility requirements are determined by the official registration form and event guidelines. Check the current requirements before submitting your application.",
  },
  {
    question: "Do I need previous modelling experience?",
    answer: "Previous experience requirements depend on the applicable category and event guidelines. Review the registration form carefully and provide accurate information about your experience.",
  },
  {
    question: "Can children participate?",
    answer: "Children may apply if they meet the requirements of an officially supported category. Applications involving minors must follow the applicable guardian consent and documentation requirements.",
  },
  {
    question: "Does submitting an application guarantee selection?",
    answer: "No. Submitting an application should not be presented as a guarantee of selection or participation. Any selection decision is subject to the organizers' actual review process and applicable event guidelines.",
  },
  {
    question: "What documents or photographs do I need?",
    answer: "Please review the official registration form for the required photographs, profile details, identification documents, and other supporting information. Submit only the requested materials and follow the form's instructions.",
  },
  {
    question: "How can my brand become a BFL partner or sponsor?",
    answer: (
      <>
        Brands and organizations interested in collaborating with Bihar Fashion League can contact the BFL team through the official contact page or the existing partnership inquiry channel.{" "}
        <Link href="/partners" className="text-[#171717] underline underline-offset-4 hover:opacity-80">
          Explore Partnerships
        </Link>
      </>
    ),
  },
  {
    question: "How can I contact the BFL team?",
    answer: (
      <>
        For questions about registration, participation, events, or collaboration, use the official Contact page or the verified contact details already displayed on the website.{" "}
        <Link href="/contact" className="text-[#171717] underline underline-offset-4 hover:opacity-80">
          Contact Us
        </Link>
      </>
    ),
  },
  {
    question: "Where can I follow BFL updates?",
    answer: (
      <>
        Follow the official Bihar Fashion League social media account for announcements and updates:{" "}
        <a href="https://www.instagram.com/biharfashionleague" target="_blank" rel="noopener noreferrer" className="text-[#171717] underline underline-offset-4 hover:opacity-80">
          @biharfashionleague
        </a>
      </>
    ),
  },
];

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

function FaqAccordionItem({ question, answer }: FaqItemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E2DC]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left bg-transparent text-[#171717] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#171717] focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="text-lg sm:text-xl font-serif text-[#171717] pr-6">{question}</span>
        {isOpen ? (
          <Minus className="h-4 w-4 text-[#171717] flex-shrink-0" />
        ) : (
          <Plus className="h-4 w-4 text-[#171717] flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <div className="text-base leading-relaxed text-[#66645F] max-w-2xl">{answer}</div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const headerRef = useReveal();
  const listRef = useReveal();

  return (
    <section className="relative py-16 lg:py-24 bg-[#F8F7F0]">
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
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.32em] uppercase text-[#66645F] mb-4">NEED TO KNOW</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#66645F]">
            Everything you need to know about participation, eligibility, and collaboration.
          </p>
        </div>

        <div ref={listRef} className="reveal max-w-4xl mx-auto">
          {FAQS.map((faq, index) => (
            <FaqAccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
