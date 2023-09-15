import { string } from "zod";
import bcrypt from "bcryptjs";
import Users, { UserDocument } from "../models/users.model";
import { CreateUserInput } from "../schemas/users.schema";
import { FilterQuery } from "mongoose";

export async function createUser(user: CreateUserInput["body"]) {
  try {
    return Users.create(user);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return Users.findOne(query).lean();
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await Users.findOne({ email });
  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);
  console.log(isValid);
  // const isValid = await Users.comparePassword(password);
  if (!isValid) return false;
  return user;
}
