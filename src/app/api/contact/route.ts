import { NextRequest, NextResponse } from "next/server";

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
      budget: sanitize(data.budget || "Not specified"),
      message: sanitize(data.message),
      submittedAt: new Date().toISOString(),
    };

    // Log the submission (in production, you would send this to an email service,
    // CRM, or database like Supabase, Airtable, etc.)
    console.log("Contact form submission:", sanitizedData);

    // Here you could integrate with:
    // - Email service (SendGrid, Resend, Postmark)
    // - CRM (HubSpot, Salesforce)
    // - Database (Supabase, PlanetScale)
    // - Notification (Slack webhook)

    // Example Slack webhook integration (uncomment and add SLACK_WEBHOOK_URL env var):
    // if (process.env.SLACK_WEBHOOK_URL) {
    //   await fetch(process.env.SLACK_WEBHOOK_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       text: `New contact form submission!\n*Name:* ${sanitizedData.firstName} ${sanitizedData.lastName}\n*Email:* ${sanitizedData.email}\n*Company:* ${sanitizedData.company}\n*Budget:* ${sanitizedData.budget}\n*Message:* ${sanitizedData.message}`,
    //     }),
    //   });
    // }

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
