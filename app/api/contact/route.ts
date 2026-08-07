import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(120),
  challenge: z.string().trim().min(20).max(3000),
  budgetRange: z.string().trim().min(2).max(100),
  website: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Expected a JSON request." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "The request could not be read." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please complete every field with valid project information." },
      { status: 400 },
    );
  }

  const { name, email, company, challenge, budgetRange } = parsed.data;
  const subject = `Project enquiry | ${company}`;
  const message = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Budget range: ${budgetRange}`,
    "",
    "Challenge:",
    challenge,
  ].join("\n");
  const mailto = `mailto:support@teampsmpv.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  return NextResponse.json(
    { ok: true, mailto },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
