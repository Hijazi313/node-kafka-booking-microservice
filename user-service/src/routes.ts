import { Express } from "express";
import { createUserHandler } from "./controllers/users.controllers";
import validateResource from "./middleware/validationResource";
import { createUserSchema } from "./schemas/users.schema";
import { createSession } from "./services/sessions.service";
import createSessionSchema from "./schemas/sessions.schema";
import {
  createUserSessionHandler,
  deleteSessionOfCurrentUser,
  getSessionsOfCurrentUser,
} from "./controllers/sessions.controller";
import requireAuth from "./middleware/requireAuth";
export default function routes(app: Express) {
  app.get("/api/users/ping", (req, res, next) => {
    return res.status(200).json({
      message: "Pong",
    });
  });

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/users/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/users/sessions/me", requireAuth, getSessionsOfCurrentUser);
  app.delete("/api/users/sessions/me", requireAuth, deleteSessionOfCurrentUser);

  app.all("*", (req, res, next) => {
    return res.status(404).json({
      status: "Fail",
      message: `Cant't find ${req.originalUrl} on this server!`,
    });
  });
}
