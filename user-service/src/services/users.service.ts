import bcrypt from "bcryptjs";
import Users, { UserDocument } from "../models/users.model";
import { CreateUserInput } from "../schemas/users.schema";
import { FilterQuery } from "mongoose";

export async function createUser(user: CreateUserInput["body"]) {
  return Users.create(user);
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
  // const isValid = await Users.comparePassword(password);
  if (!isValid) return false;
  return user;
}
