import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      product,
      issue,
      message,
    } = await req.json();

    const ticketId = `ML-${Date.now()}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
You are an ecommerce customer support assistant.

Customer Name: ${name}
Customer Email: ${email}
Product: ${product}
Issue Type: ${issue}

Customer Message:
${message}

Generate a professional support ticket summary for the support team.

Do not include email headers like Subject, To, From, Date.
Return only the support ticket content.
`);

    const generatedEmail =
      result.response.text();

    // Send to support team
    const supportResponse =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.SUPPORT_EMAIL!,
        replyTo: email,
        subject: `[${issue}] ${
          product || "General Inquiry"
        }`,
        text: generatedEmail,
      });

    console.log(
      "Support email sent:",
      supportResponse
    );

    // Send confirmation to customer
    const customerResponse =
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Support Ticket Created - ${ticketId}`,
        text: `
Hello ${name},

Thank you for contacting Mythic Legends.

Your support request has been received successfully.

Ticket ID: ${ticketId}

Issue Type: ${issue}
Product: ${product || "Not specified"}

Our support team will review your request and respond within 24 hours.

Regards,
Mythic Legends Support Team
`,
      });

    console.log(
      "Customer email sent:",
      customerResponse
    );

    return NextResponse.json({
      success: true,
      ticketId,
    });
  } catch (error) {
    console.error(
      "Support API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process support request",
      },
      {
        status: 500,
      }
    );
  }
}