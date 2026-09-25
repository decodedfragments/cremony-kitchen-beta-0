"use server";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(input: {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}): Promise<ContactResult> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();
  if (!name || !email || !email.includes("@") || !message) {
    return { ok: false, error: "Please add your name, a valid email and a message." };
  }
  await db.insert(contactMessages).values({
    name: name.slice(0, 160),
    email: email.slice(0, 200),
    phone: (input.phone ?? "").trim().slice(0, 40),
    topic: (input.topic || "general").slice(0, 60),
    message: message.slice(0, 5000),
  });
  return { ok: true };
}
