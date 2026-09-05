const CLOCK_TZ = "America/New_York";

export function formatClock(iso: string, now = new Date()): string {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "—";

  const sameDay =
    then.toLocaleDateString("en-US", { timeZone: CLOCK_TZ }) ===
    now.toLocaleDateString("en-US", { timeZone: CLOCK_TZ });

  if (sameDay) {
    return then.toLocaleTimeString("en-US", {
      timeZone: CLOCK_TZ,
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return then.toLocaleString("en-US", {
    timeZone: CLOCK_TZ,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function minutesAgo(iso: string, now = new Date()): number {
  return Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60000));
}
