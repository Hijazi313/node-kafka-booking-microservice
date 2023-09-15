import { object, string } from "zod";

const createSessionSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Must be a valid email address"
    ),
    password: string(),
  }),
});

export default createSessionSchema;
