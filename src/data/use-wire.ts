"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage, ChatUser, ConnectionState, PresenceMember, Room, RoomId } from "@/domain";
import { parseServerFrame, type ClientFrame } from "./protocol";
import { loadOrCreateYou, persistYou } from "./session";
import { defaultWsUrl } from "./ws-url";

type WireState = {
  you: ChatUser | null;
  rooms: Room[];
  messages: ChatMessage[];
  presence: PresenceMember[];
  connection: ConnectionState;
  errorDetail: string | null;
  activeRoomId: RoomId | null;
  unread: Record<RoomId, number>;
};

const initial: WireState = {
  you: null,
  rooms: [],
  messages: [],
  presence: [],
  connection: "idle",
  errorDetail: null,
  activeRoomId: null,
  unread: {},
};

export function useWire() {
  const [state, setState] = useState<WireState>(initial);
  const socketRef = useRef<WebSocket | null>(null);
  const youRef = useRef<ChatUser | null>(null);
  const activeRef = useRef<RoomId | null>(null);
  const retryRef = useRef(0);
  const aliveRef = useRef(true);

  const send = useCallback((frame: ClientFrame) => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(frame));
  }, []);

  const connect = useCallback(() => {
    setState((s) => ({ ...s, connection: "connecting", errorDetail: null }));
    const you = loadOrCreateYou();
    youRef.current = you;
    const socket = new WebSocket(defaultWsUrl());
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      retryRef.current = 0;
      send({ type: "hello", user: you });
    });

    socket.addEventListener("message", (event) => {
      const frame = parseServerFrame(String(event.data));
      if (!frame) return;
      if (frame.type === "hello-ok") {
        const first = frame.rooms[0]?.id ?? null;
        const nextRoom = activeRef.current ?? first;
        activeRef.current = nextRoom;
        setState((s) => ({
          ...s,
          you: frame.you,
          rooms: frame.rooms,
          messages: frame.messages,
          presence: frame.presence,
          connection: "live",
          errorDetail: null,
          activeRoomId: nextRoom,
        }));
        if (nextRoom) send({ type: "join", roomId: nextRoom });
        return;
      }
      if (frame.type === "message") {
        setState((s) => {
          const unread = { ...s.unread };
          if (frame.message.roomId !== activeRef.current) {
            unread[frame.message.roomId] = (unread[frame.message.roomId] ?? 0) + 1;
          }
          return { ...s, messages: [...s.messages, frame.message], unread };
        });
        return;
      }
      if (frame.type === "presence") {
        setState((s) => ({ ...s, presence: frame.presence }));
        return;
      }
      if (frame.type === "error") {
        setState((s) => ({
          ...s,
          connection: frame.code === "socket" ? "error" : s.connection,
          errorDetail: frame.detail,
        }));
      }
    });

    socket.addEventListener("close", () => {
      if (!aliveRef.current) return;
      setState((s) => ({ ...s, connection: "offline", errorDetail: "The wire went quiet." }));
      const wait = Math.min(8000, 600 * 2 ** retryRef.current);
      retryRef.current += 1;
      window.setTimeout(() => {
        if (aliveRef.current) connect();
      }, wait);
    });

    socket.addEventListener("error", () => {
      setState((s) => ({
        ...s,
        connection: "error",
        errorDetail: "Could not reach the night wire. Is the socket still plugged in?",
      }));
    });
  }, [send]);

  useEffect(() => {
    aliveRef.current = true;
    connect();
    return () => {
      aliveRef.current = false;
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [connect]);

  const joinRoom = useCallback(
    (roomId: RoomId) => {
      activeRef.current = roomId;
      setState((s) => ({
        ...s,
        activeRoomId: roomId,
        unread: { ...s.unread, [roomId]: 0 },
      }));
      send({ type: "join", roomId });
    },
    [send],
  );

  const say = useCallback(
    (body: string) => {
      const roomId = activeRef.current;
      if (!roomId) return;
      send({ type: "say", roomId, body });
    },
    [send],
  );

  const retryNow = useCallback(() => {
    socketRef.current?.close();
    retryRef.current = 0;
    connect();
  }, [connect]);

  const renameYou = useCallback((next: ChatUser) => {
    persistYou(next);
    youRef.current = next;
    setState((s) => ({ ...s, you: next }));
    send({ type: "hello", user: next });
    const roomId = activeRef.current;
    if (roomId) send({ type: "join", roomId });
  }, [send]);

  const thread = useMemo(
    () => state.messages.filter((m) => m.roomId === state.activeRoomId),
    [state.messages, state.activeRoomId],
  );

  const activeRoom = useMemo(
    () => state.rooms.find((r) => r.id === state.activeRoomId) ?? null,
    [state.rooms, state.activeRoomId],
  );

  return { ...state, thread, activeRoom, joinRoom, say, retryNow, renameYou };
}
