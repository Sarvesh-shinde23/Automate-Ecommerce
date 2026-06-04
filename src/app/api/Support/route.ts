import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, product, issue, message } =
      await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
You are an ecommerce support assistant.

Customer Name: ${name}
Customer Email: ${email}
Product: ${product}
Issue Type: ${issue}

Customer Message:
${message}

Generate a professional support email for the support team.
`);

    const generatedEmail = result.response.text();

    await resend.emails.send({
      from: "support@yourdomain.com",
      to: process.env.SUPPORT_EMAIL!,
      subject: `[${issue}] ${product || "General Inquiry"}`,
      text: generatedEmail,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}