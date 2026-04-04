import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      console.log("Attempting to send email via Resend...");
      const { data, error } = await resend.emails.send({
        from: "Mavi Basım İletişim <info@mavibasim.com>",
        to: ["info@mavibasim.com"],
        replyTo: email,
        subject: `Yeni Mesaj: ${name}`,
        text: `Gönderen: ${name}\nEmail: ${email}\nMesaj: ${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #29ADDF; border-bottom: 2px solid #29ADDF; padding-bottom: 10px;">Yeni İletişim Formu Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p><strong>Mesaj:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #888;">Bu e-posta mavibasim.com iletişim formu aracılığıyla gönderilmiştir.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(400).json({ error: error.message });
      }

      console.log("Email sent successfully:", data);
      res.status(200).json({ message: "Email sent successfully", id: data?.id });
    } catch (err) {
      console.error("Unexpected Error sending email:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
