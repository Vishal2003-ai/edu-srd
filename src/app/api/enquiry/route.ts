import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enquiry from "@/models/enquiry";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const enquiry = await Enquiry.create(body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: enquiry.email,
      subject: "Enquiry Received",
      html: `
        <h2>Hello ${enquiry.fullName}</h2>

        <p>Thank you for contacting us.</p>

        <p>We have received your enquiry.</p>

        <br/>

        <b>Subject:</b> ${enquiry.subject}

        <br/><br/>

        We will contact you shortly.

        <br/><br/>

        Thanks
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry Submitted",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}