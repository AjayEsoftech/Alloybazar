import nodemailer from "nodemailer";

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.SMTP_FROM;

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const normalizeBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    return res.status(500).json({
      ok: false,
      error: `Missing server configuration: ${missing.join(", ")}`,
    });
  }

  const { name, company, role, email, mobile, message } = normalizeBody(req.body);

  if (!name || !company || !role || !email || !mobile) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  try {
    const leadLines = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Role: ${role}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
    ];
    if (message && String(message).trim().length > 0) {
      leadLines.push("", "Message / Requirement:", String(message).trim());
    }

    await smtpTransport.sendMail({
      from: process.env.SMTP_FROM,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Alloybazaar lead: ${name} (${company})`,
      text: leadLines.join("\n"),
    });

    await smtpTransport.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "We received your Alloybazaar request",
      text: [
        `Hi ${name},`,
        "",
        "Thanks for reaching out to Alloybazaar. We have received your request and will get back to you soon.",
        "",
        "If you have any additional details to share, just reply to this email.",
        "",
        "Regards,",
        "Alloybazaar Team",
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Failed to send email. Please try again.",
    });
  }
}
