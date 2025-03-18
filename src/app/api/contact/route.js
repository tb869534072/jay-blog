import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async(req) => {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
    });
  
    const emailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Contact Message from Blog`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };
  
    await transporter.sendMail(emailOptions);
  
    return NextResponse.json({ message: "Email sent successfully!"}, { status: 200});
  } catch (error) {
    return NextResponse.json({ message: "Error sending email"}, { status: 500});
  }
}