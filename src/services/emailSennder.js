import { Resend } from 'resend';

export async function enviarCorreoRecuperacion(email, token) {
  const resend = new Resend(process.env.RESEND_API_KEY); // mover aquí la inicialización
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Soporte App <onboarding@resend.dev>',
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <div style="font-family: Arial, sans-serif; color: #222; background: #f7f7f7; padding: 24px; border-radius: 8px; max-width: 480px; margin: auto;">
        <h2 style="color: #006341;">Recuperación de contraseña</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón para continuar:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #d0021b; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 16px 0;">Cambiar contraseña</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        <p style="font-size: 13px; color: #888;">Este enlace caduca en 15 minutos.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error al enviar correo:", error);
    throw new Error("No se pudo enviar el correo");
  }

  console.log("Correo enviado:", data);
}
