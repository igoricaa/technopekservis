import { EmailTemplate } from '@/components/email-template';
import { rateLimit } from '@/utils/rate-limit';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(req: any) {
  try {
    limiter.check(req, 3);

    const { name, email, phone, country, company, subject, message } =
      await req.json();

    if (
      !name ||
      !email ||
      !phone ||
      !country ||
      !company ||
      !message ||
      !email.includes('@') ||
      !subject
    ) {
      return Response.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Kontakt forma <kontakt@technopekservis.rs>',
      to: ['office@technopekservis.rs', 'stanisavljevic.igor4@gmail.com'],
      subject: 'Kontakt forma',
      // replyTo: email,
      react: EmailTemplate(
        name,
        email,
        phone,
        country,
        company,
        subject,
        message
      ),
    });

    return Response.json({ success: true, data });
  } catch (error: any) {
    if (error.statusCode && error.statusCode === 429) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }
    return Response.json({ error });
  }
}
