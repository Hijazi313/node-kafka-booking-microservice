import { Request, Response } from "express";
import { createUser } from "../services/users.service";
import { CreateUserInput } from "../schemas/users.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ message: "User created", data: user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
