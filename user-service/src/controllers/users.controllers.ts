import { NextFunction, Request, Response } from "express";
import { MongooseError, Error } from "mongoose";
import { createUser } from "../services/users.service";
import { CreateUserInput } from "../schemas/users.schema";
import AppError from "../utils/appError";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ message: "User created", data: user });
  } catch (err: any) {
    next(err);
  }
}
