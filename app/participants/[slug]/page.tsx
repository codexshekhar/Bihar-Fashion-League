import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PHOTO_MAPPING_MANIFEST } from "@/lib/photo-mapping";

export default function ParticipantDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Look up the photo by matching slug to imageId or originalFilename
  const photo = PHOTO_MAPPING_MANIFEST.find(
    (p) =>
      p.imageId === slug ||
      p.originalFilename.replace(/\.(jpeg|jpg|png)$/i, "") === slug ||
      p.originalFilename.toLowerCase().includes(slug.toLowerCase())
  );

  const isVerified = photo?.verificationStatus === "verified" && photo?.publicationApproved === true;

  return (
    <main className="relative bg-white">
      <Header />

      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${photo?.filePath || "/images/BFL_2025_14.jpeg"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <div className="h-[500px] rounded-3xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={photo?.filePath || "/images/BFL_2025_14.jpeg"}
                  alt={photo?.altText || "Participant portrait - pending verification"}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              {isVerified && photo ? (
                <>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
                    {photo.role}
                  </span>
                  <h1 className="text-5xl font-bold tracking-tight text-white mb-6 font-serif">
                    {photo.displayName}
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-lg">
                    {photo.eventName ? `Featured at ${photo.eventName}` : "Bihar Fashion League participant"}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-white/60 w-20">Role</span>
                      <span className="text-white">{photo.role}</span>
                    </div>
                    {photo.eventName && (
                      <div className="flex items-start gap-4">
                        <span className="text-white/60 w-20">Event</span>
                        <span className="text-white">{photo.eventName}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-700 text-xs font-medium mb-6">
                    Pending Verification
                  </span>
                  <h1 className="text-5xl font-bold tracking-tight text-white mb-6 font-serif">
                    Participant Profile
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-lg mx-auto">
                    This participant profile is pending identity verification. Please contact the BFL
                    administrator to review and approve photo mappings.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          {isVerified && photo ? (
            <>
              <h2 className="text-3xl font-bold tracking-tight mb-8 font-serif">About {photo.displayName}</h2>
              <div className="prose prose-lg text-muted-foreground max-w-none">
                <p>
                  {photo.displayName} is a {photo.role.toLowerCase()} associated with Bihar Fashion League.
                  {photo.eventName ? ` Featured at ${photo.eventName}.` : ""}
                </p>
                <p>
                  This profile is based on verified photography from BFL official records. Additional
                  biographical details will be added as they are confirmed by the BFL team.
                </p>
              </div>
            </>
          ) : null}

          <div className="mt-16 flex justify-center">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/participants">
                <ArrowRight className="-mr-1 h-4 w-4" />
                Back to Participants
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
