import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export function FaqSection({
  faqs = [],
}: {
  faqs?: Array<FaqItem>;
}) {
  return (
    <section className="relative py-32 lg:py-48 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start text-center lg:text-start max-w-3xl mx-auto mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Everything you need to know about participation, eligibility, and collaboration.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.length > 0 ? (
            faqs.map((item) => (
              <FaqItem key={item.id} question={item.question} answer={item.answer} />
            ))
          ) : (
            <div className="border-b border-black/10 py-24 text-center">
              <p className="text-lg text-muted-foreground">
                Frequently asked questions will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-black/10 pb-12 pt-12 last:border-0 group">
      <button className="flex w-full items-center justify-between text-left">
        <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
          {question}
        </span>
        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
      <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
        {answer}
      </p>
    </div>
  );
}
