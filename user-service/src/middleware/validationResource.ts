import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, inferFormattedError } from "zod";
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid request body", error: err.errors });
      }
    }
  };
export default validateResource;
