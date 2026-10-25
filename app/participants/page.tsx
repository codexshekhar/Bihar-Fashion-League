import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ParticipantsContent } from "@/app/participants/components/ParticipantsContent";

export const metadata = {
  title: "Participants | Bihar Fashion League",
  description: "Discover the participants of Bihar Fashion League - emerging talent, runway models, showstoppers, and featured talent.",
};

export default function ParticipantsPage() {
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[url('/images/BFL_2025_18.jpeg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-40 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">Participants</h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Meet the emerging talent shaping Bihar's fashion future.
          </p>
        </div>
      </section>

      <ParticipantsContent />

      <Footer />
    </main>
  );
}
