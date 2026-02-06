import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitize(str: string): string {
  return str.trim().slice(0, 1000);
}

function formatBudget(budget: string): string {
  const budgetMap: Record<string, string> = {
    "5k-10k": "$5,000 - $10,000",
    "10k-25k": "$10,000 - $25,000",
    "25k+": "$25,000+",
  };
  return budgetMap[budget] || "Not specified";
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    const errors: Record<string, string> = {};

    if (!data.firstName?.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName?.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.company?.trim()) {
      errors.company = "Company is required";
    }

    if (!data.message?.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitize(data.firstName),
      lastName: sanitize(data.lastName),
      email: sanitize(data.email),
      company: sanitize(data.company),
      budget: formatBudget(data.budget),
      message: sanitize(data.message),
      submittedAt: new Date().toISOString(),
    };

    // Send email via Resend
    if (resend) {
      const toEmail = process.env.CONTACT_EMAIL || "hello@adsx.com";
      const fromEmail = process.env.FROM_EMAIL || "noreply@adsx.com";

      await resend.emails.send({
        from: `AdsX Contact Form <${fromEmail}>`,
        to: toEmail,
        replyTo: sanitizedData.email,
        subject: `New Contact: ${sanitizedData.firstName} ${sanitizedData.lastName} from ${sanitizedData.company}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div style="background: #f9fafb; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 140px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${sanitizedData.firstName} ${sanitizedData.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                    <a href="mailto:${sanitizedData.email}" style="color: #10b981; text-decoration: none;">${sanitizedData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Company</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${sanitizedData.company}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151;">Budget</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${sanitizedData.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; color: #1f2937; white-space: pre-wrap;">${sanitizedData.message}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  Submitted on ${new Date(sanitizedData.submittedAt).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedData.firstName} ${sanitizedData.lastName}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}
Budget: ${sanitizedData.budget}

Message:
${sanitizedData.message}

Submitted: ${sanitizedData.submittedAt}
        `.trim(),
      });

      // Send confirmation email to the user
      await resend.emails.send({
        from: `AdsX <${fromEmail}>`,
        to: sanitizedData.email,
        subject: "Thanks for reaching out to AdsX!",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
            </div>
            <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                Hi ${sanitizedData.firstName},
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                We've received your message and will get back to you within 24 hours. In the meantime, here's what you shared with us:
              </p>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;"><strong>Company:</strong> ${sanitizedData.company}</p>
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;"><strong>Budget:</strong> ${sanitizedData.budget}</p>
                <p style="color: #6b7280; font-size: 14px; margin: 0;"><strong>Message:</strong> ${sanitizedData.message.slice(0, 200)}${sanitizedData.message.length > 200 ? "..." : ""}</p>
              </div>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                While you wait, check out our <a href="https://www.adsx.com/blog" style="color: #10b981; text-decoration: none;">latest blog posts</a> on AI search advertising.
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                Best,<br>
                The AdsX Team
              </p>
            </div>
          </div>
        `,
        text: `
Hi ${sanitizedData.firstName},

Thanks for reaching out to AdsX! We've received your message and will get back to you within 24 hours.

Here's what you shared with us:
- Company: ${sanitizedData.company}
- Budget: ${sanitizedData.budget}
- Message: ${sanitizedData.message}

While you wait, check out our latest blog posts on AI search advertising: https://www.adsx.com/blog

Best,
The AdsX Team
        `.trim(),
      });
    } else {
      // Log to console if Resend is not configured (development mode)
      console.log("Contact form submission (Resend not configured):", sanitizedData);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll be in touch soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
