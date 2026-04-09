import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

const PORT = Number(process.env.PORT || 8787);
const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.SMTP_FROM;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
  })
);
app.use(express.json({ limit: "100kb" }));

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const missing = required.filter((key) => !process.env[key]);

app.post("/api/lead", async (req, res) => {
  if (missing.length) {
    return res.status(500).json({
      ok: false,
      error: `Missing server configuration: ${missing.join(", ")}`,
    });
  }

  const { name, company, role, email, mobile } = req.body ?? {};

  if (!name || !company || !role || !email || !mobile) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  try {
    await smtpTransport.sendMail({
      from: process.env.SMTP_FROM,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Alloybazaar lead: ${name} (${company})`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Role: ${role}`,
        `Email: ${email}`,
        `Mobile: ${mobile}`,
      ].join("\n"),
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Failed to send email. Please try again.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Lead server listening on http://localhost:${PORT}`);
});
