import { Document, Schema, model } from "mongoose";
import config from "config";
import bcrypt from "bcryptjs";
import { UserDocument } from "./users.model";
export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  updatedAt: Date;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const sesssionsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const Sessions = model("Sesssion", sesssionsSchema);

export default Sessions;
