export function normalizeBody(raw: string): string {
  return raw.replace(/\r\n/g, "\n").trim();
}

export function canSendBody(raw: string): boolean {
  const body = normalizeBody(raw);
  return body.length > 0 && body.length <= 2000;
}

export function lastLine(body: string): string {
  const line = normalizeBody(body).split("\n").filter(Boolean).at(-1) ?? "";
  return line.length > 72 ? `${line.slice(0, 69)}…` : line;
}
