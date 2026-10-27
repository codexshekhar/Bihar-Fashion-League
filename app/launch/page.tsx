import { redirect } from "next/navigation";
import LaunchCountdown from "./launch-countdown";

const LAUNCH_TIMESTAMP = new Date("2026-10-27T18:00:00+05:30").getTime();

export default function LaunchPage() {
  // Server-side gate: if already launched, redirect to homepage
  if (Date.now() >= LAUNCH_TIMESTAMP) {
    redirect("/");
  }

  return <LaunchCountdown />;
}
