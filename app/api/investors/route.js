// POST /api/investors — forwards an investor note via Resend.
// Same pattern as /api/contact and /api/careers: no SDK, plain fetch, RESEND_API_KEY env.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const { firstName, lastName, email, firm, checkSize, thesis } = body ?? {};
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    typeof email !== "string" ||
    !EMAIL_RE.test(email) ||
    !firm?.trim() ||
    !thesis?.trim()
  ) {
    return Response.json({ error: "missing or invalid fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "mail not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // TODO(eric): sender must be on a domain verified in Resend.
      from: "Tensir Investors <investors@tensir.ai>",
      to: ["eric@tensir.ai"],
      reply_to: email,
      subject: `investors — ${firstName.trim()} ${lastName.trim()} (${firm.trim()})`,
      text:
        `from: ${firstName.trim()} ${lastName.trim()} <${email}>\n` +
        `firm: ${firm.trim()}\n` +
        `check size: ${(checkSize || "").trim() || "—"}\n` +
        `\n— thesis / interest —\n\n${thesis.trim()}\n`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
