import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendRegistrationEmail(to: string, username: string) {
  await mailer.sendMail({
    from: `"BudgetMate" <${process.env.SMTP_USER}>`,
    to,
    subject: "Rejestracja zakończona sukcesem",
    html:
      `<h1> Zostałeś zarejestrowany do BudgetMate Web</h1>` +
      `<h2>Witaj ${username}!</h2><p>Twoje konto zostało poprawnie utworzone.</p>`,
  });
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await mailer.sendMail({
    from: `"BudgetMate" <${process.env.SMTP_USER}>`,
    to,
    subject: "Resetowanie hasła BudgetMate Web",
    html: `<p>Aby zresetować hasło, kliknij poniższy link:</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>Link jest ważny przez 15 minut.</p>`,
  });
}
