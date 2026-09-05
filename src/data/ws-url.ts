export const WS_PORT = Number(process.env.WS_PORT ?? 3001);

export function defaultWsUrl(): string {
  if (typeof window === "undefined") {
    return `ws://127.0.0.1:${WS_PORT}`;
  }
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = process.env.NEXT_PUBLIC_WS_HOST ?? window.location.hostname;
  const port = process.env.NEXT_PUBLIC_WS_PORT ?? String(WS_PORT);
  return `${proto}//${host}:${port}`;
}
