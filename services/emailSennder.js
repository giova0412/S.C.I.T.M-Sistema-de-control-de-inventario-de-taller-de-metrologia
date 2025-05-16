import { Resend } from 'resend';

export async function enviarCorreoRecuperacion(email, token) {
  const resend = new Resend(process.env.RESEND_API_KEY); // mover aquí la inicialización
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Soporte App <onboarding@resend.dev>',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este enlace caduca en 15 minutos.</p>
    `,
  });

  if (error) {
    console.error("Error al enviar correo:", error);
    throw new Error("No se pudo enviar el correo");
  }

  console.log("Correo enviado:", data);
}
