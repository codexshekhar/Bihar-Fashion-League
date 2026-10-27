import { redirect } from "next/navigation";
import LaunchCountdown from "./launch-countdown";
import { LAUNCH_TIMESTAMP } from "@/lib/launch-gate";

export default function LaunchPage() {
  // Server-side gate: if already launched, redirect to homepage
  if (Date.now() >= LAUNCH_TIMESTAMP) {
    redirect("/");
  }

  return <LaunchCountdown />;
}
