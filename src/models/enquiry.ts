import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IEnquiry extends Document {
  fullName: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: "pending" | "contacted" | "resolved";
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "contacted", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Enquiry ||
  model<IEnquiry>("Enquiry", EnquirySchema);