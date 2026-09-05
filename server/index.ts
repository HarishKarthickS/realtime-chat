import { WebSocketServer, type WebSocket } from "ws";
import { ChatStore } from "../src/data/store";
import { parseClientFrame, type ServerFrame } from "../src/data/protocol";
import { WS_PORT } from "../src/data/ws-url";
import type { ChatUser } from "../src/domain";

const store = new ChatStore();
const sockets = new Map<WebSocket, ChatUser>();

const wss = new WebSocketServer({ port: WS_PORT });

function push(socket: WebSocket, frame: ServerFrame) {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(frame));
  }
}

function broadcast(frame: ServerFrame) {
  for (const socket of sockets.keys()) push(socket, frame);
}

wss.on("connection", (socket) => {
  socket.on("message", (raw) => {
    const frame = parseClientFrame(String(raw));
    const you = sockets.get(socket);

    if (!frame) {
      push(socket, { type: "error", code: "socket", detail: "That frame did not parse." });
      return;
    }

    if (frame.type === "hello") {
      sockets.set(socket, frame.user);
      const snap = store.snapshot();
      push(socket, {
        type: "hello-ok",
        you: frame.user,
        rooms: snap.rooms,
        messages: snap.messages,
        presence: snap.presence,
      });
      return;
    }

    if (!you) {
      push(socket, { type: "error", code: "not-hello", detail: "Say hello before you wander the rooms." });
      return;
    }

    if (frame.type === "join") {
      const presence = store.join(you, frame.roomId);
      if (!presence) {
        push(socket, { type: "error", code: "unknown-room", detail: "That room boarded up last winter." });
        return;
      }
      broadcast({ type: "presence", presence });
      return;
    }

    if (frame.type === "leave") {
      broadcast({ type: "presence", presence: store.leave(you.id) });
      return;
    }

    if (frame.type === "say") {
      const result = store.say(you, frame.roomId, frame.body);
      if (result === "bad-body") {
        push(socket, { type: "error", code: "bad-body", detail: "Empty notes do not travel. Try again." });
        return;
      }
      if (result === "unknown-room") {
        push(socket, { type: "error", code: "unknown-room", detail: "That room boarded up last winter." });
        return;
      }
      broadcast({ type: "message", message: result });
    }
  });

  socket.on("close", () => {
    const you = sockets.get(socket);
    sockets.delete(socket);
    if (you) broadcast({ type: "presence", presence: store.leave(you.id) });
  });
});

console.log(`night wire open on ws://127.0.0.1:${WS_PORT}`);
