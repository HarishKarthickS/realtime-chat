import type { ChatMessage, ChatUser, Room } from "../domain";

const hoursAgo = (hours: number): string =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const SEED_USERS: Record<string, ChatUser> = {
  mira: { id: "usr_mira", displayName: "Mira Chen", initials: "MC" },
  jules: { id: "usr_jules", displayName: "Jules Okonkwo", initials: "JO" },
  anil: { id: "usr_anil", displayName: "Anil Rao", initials: "AR" },
  tess: { id: "usr_tess", displayName: "Tess Marin", initials: "TM" },
  super: { id: "usr_super", displayName: "Building super", initials: "BS" },
};

export const SEED_ROOMS: Room[] = [
  {
    id: "room_fire_escape",
    name: "The fire escape",
    kind: "hallway",
    subtitle: "third floor, the one with the dead geranium",
  },
  {
    id: "room_kitchen",
    name: "Kitchen at 1am",
    kind: "kitchen",
    subtitle: "someone left the oven light on again",
  },
  {
    id: "room_night_shift",
    name: "Night shift",
    kind: "shift",
    subtitle: "pharmacy counter, fluorescent hum",
  },
  {
    id: "room_roof",
    name: "Water tower",
    kind: "roof",
    subtitle: "wind, pigeons, the 4 train",
  },
];

export const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "msg_fe_1",
    roomId: "room_fire_escape",
    author: SEED_USERS.mira,
    body: "Did you hear the couple in 3B? They were arguing about a parking ticket like it was a custody hearing.",
    sentAt: hoursAgo(6.2),
  },
  {
    id: "msg_fe_2",
    roomId: "room_fire_escape",
    author: SEED_USERS.jules,
    body: "I heard the kettle. Then silence. Then someone dragging a chair. That's the whole opera.",
    sentAt: hoursAgo(5.8),
  },
  {
    id: "msg_fe_3",
    roomId: "room_fire_escape",
    author: SEED_USERS.mira,
    body: "Bring the lighter when you come up. Mine died on the last cigarette of a bad week.",
    sentAt: hoursAgo(4.1),
  },
  {
    id: "msg_k_1",
    roomId: "room_kitchen",
    author: SEED_USERS.anil,
    body: "Whoever finished the leftover dumplings: I hope they were cold and you thought about your choices.",
    sentAt: hoursAgo(8),
  },
  {
    id: "msg_k_2",
    roomId: "room_kitchen",
    author: SEED_USERS.tess,
    body: "It was me. They were excellent. I left you the burnt corner as tribute.",
    sentAt: hoursAgo(7.4),
  },
  {
    id: "msg_k_3",
    roomId: "room_kitchen",
    author: SEED_USERS.anil,
    body: "The kettle is screaming and I am choosing not to be a person about it.",
    sentAt: hoursAgo(1.2),
  },
  {
    id: "msg_ns_1",
    roomId: "room_night_shift",
    author: SEED_USERS.tess,
    body: "Insurance called twice. I let it ring. If it's urgent they can learn to text like a mammal.",
    sentAt: hoursAgo(3.5),
  },
  {
    id: "msg_ns_2",
    roomId: "room_night_shift",
    author: SEED_USERS.jules,
    body: "Fluorescent #3 is flickering in Morse. I think it's asking for a union.",
    sentAt: hoursAgo(2.9),
  },
  {
    id: "msg_ns_3",
    roomId: "room_night_shift",
    author: SEED_USERS.tess,
    body: "Save me a sandwich from the machine if the turkey isn't gray yet.",
    sentAt: hoursAgo(0.7),
  },
  {
    id: "msg_rf_1",
    roomId: "room_roof",
    author: SEED_USERS.super,
    body: "Door to the roof sticks if you pull. Lift, then pull. I am tired of replacing that handle.",
    sentAt: hoursAgo(12),
  },
  {
    id: "msg_rf_2",
    roomId: "room_roof",
    author: SEED_USERS.mira,
    body: "Noted. The city looks like it's holding its breath. Anybody else up?",
    sentAt: hoursAgo(0.4),
  },
];
