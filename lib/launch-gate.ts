// Launch timestamp: 27 October 2026, 6:00 PM IST (Asia/Kolkata = UTC+5:30)
// TEMPORARILY PAUSED: set to past timestamp so full site is accessible immediately.
// To resume countdown, change back to: new Date("2026-10-27T18:00:00+05:30").getTime()
export const LAUNCH_TIMESTAMP = new Date("2026-01-01T00:00:00+05:30").getTime();

export function hasLaunched(): boolean {
  return Date.now() >= LAUNCH_TIMESTAMP;
}

export function timeUntilLaunch(): number {
  return Math.max(0, LAUNCH_TIMESTAMP - Date.now());
}

export function isLaunchPath(pathname: string): boolean {
  return pathname === "/launch";
}

export function isExemptPath(pathname: string): boolean {
  return (
    pathname === "/launch" ||
    pathname === "/admin/login" ||
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap")
  );
}

export function formattedLaunchTime(): string {
  return new Date(LAUNCH_TIMESTAMP).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
