import { clampDisplayName, initialsFromName, newId, type ChatUser } from "@/domain";

const STORAGE_KEY = "realtime-chat:you";

export function loadOrCreateYou(): ChatUser {
  if (typeof window === "undefined") {
    return { id: "usr_ssr", displayName: "guest", initials: "G" };
  }
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing) as ChatUser;
    } catch {
      /* fall through */
    }
  }
  const n = Math.floor(100 + Math.random() * 900);
  const displayName = clampDisplayName(`Night owl ${n}`);
  const you: ChatUser = {
    id: newId("usr"),
    displayName,
    initials: initialsFromName(displayName),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(you));
  return you;
}

export function persistYou(you: ChatUser): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(you));
}
