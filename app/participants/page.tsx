import { redirect } from "next/navigation";

export const metadata = {
  title: "Participants | Bihar Fashion League",
};

export default function ParticipantsPage() {
  redirect("/gallery");
}
