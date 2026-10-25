import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export { resend };

export async function sendRegistrationConfirmationEmail({
  to,
  name,
  applicationNumber,
  amount,
  paymentId,
}: {
  to: string;
  name: string;
  applicationNumber: string;
  amount: number;
  paymentId: string;
}) {
  if (!resend) return { success: false, error: "Resend not configured" };
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "noreply@biharfashionleague.com",
      to: [to],
      subject: "Bihar Fashion League 2026 - Registration Confirmed",
      html: `
        <h1>Registration Confirmed</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering for Bihar Fashion League 2026.</p>
        <p><strong>Application Reference:</strong> ${applicationNumber}</p>
        <p><strong>Amount Paid:</strong> ₹${(amount / 100).toFixed(2)}</p>
        <p><strong>Payment Reference:</strong> ${paymentId}</p>
        <p><strong>Application Status:</strong> Submitted</p>
        <p>Next steps:</p>
        <ul>
          <li>Your application is under review</li>
          <li>You will receive instructions for document submission via email</li>
        </ul>
        <p>For support: piyush@biharfashionleague.com or call 6207330072, 8709363167, or 8210501502</p>
      `,
    });
    return { success: !error, data, error };
  } catch (error) {
    return { success: false, error };
  }
}
