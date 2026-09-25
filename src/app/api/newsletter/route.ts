import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !email.includes("@")) {
      return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
