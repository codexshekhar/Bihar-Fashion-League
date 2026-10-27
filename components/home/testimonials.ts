/**
 * Video testimonial configuration for the "Voices of BFL" section.
 *
 * CONTENT INTEGRITY NOTES:
 * - Video sources use actual MP4 files present in /public/Videos/.
 * - Participant names, roles, and quotes are NOT invented. They are marked
 *   as "TBD" placeholders and must be replaced with real, approved content
 *   before publishing.
 * - Poster images reference existing gallery images as stand-ins; replace
 *   with dedicated testimonial poster assets when available.
 *
 * To add or edit testimonials, modify this file only. The section reads
 * from TESTIMONIALS_DATA and renders accordingly.
 */

export interface TestimonialVideo {
  id: string;
  title: string;
  participantName: string;
  role: string;
  poster: string;
  video: string; // MP4 source (public path)
  quote?: string; // optional verified quote
  isVerified?: boolean;
}

export const TESTIMONIALS_DATA: TestimonialVideo[] = [
  {
    id: "testimonial-1",
    title: "Runway Experience",
    participantName: "TBD – Participant Name",
    role: "Model / Runner",
    poster: "/images/Gallery/BFL_2025_1.jpeg",
    video: "/Videos/WhatsApp%20Video%202026-10-25%20at%2001.29.22.mp4",
    quote: undefined,
    isVerified: false,
  },
  {
    id: "testimonial-2",
    title: "Backstage Moment",
    participantName: "TBD – Participant Name",
    role: "Designer / Stylist",
    poster: "/images/Gallery/BFL_2025_5.jpeg",
    video: "/Videos/WhatsApp%20Video%202026-10-25%20at%2001.30.38.mp4",
    quote: undefined,
    isVerified: false,
  },
  {
    id: "testimonial-3",
    title: "Event Day",
    participantName: "TBD – Participant Name",
    role: "Participant",
    poster: "/images/Gallery/BFL_2025_9.jpeg",
    video: "/Videos/WhatsApp%20Video%202026-10-25%20at%2001.30.49.mp4",
    quote: undefined,
    isVerified: false,
  },
  {
    id: "testimonial-4",
    title: "Behind the Scenes",
    participantName: "TBD – Participant Name",
    role: "Organiser / Volunteer",
    poster: "/images/Gallery/BFL_2025_11.jpeg",
    video: "/Videos/WhatsApp%20Video%202026-10-25%20at%2001.33.32.mp4",
    quote: undefined,
    isVerified: false,
  },
];
