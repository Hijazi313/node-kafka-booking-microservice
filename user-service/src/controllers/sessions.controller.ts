import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../services/users.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/sessions.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  //  Validate the user password
  const user = await validatePassword(req.body);
  //   TODO ERROR HANDLE THIS
  if (!user)
    return res.status(401).json({
      message: "Email or password is not correct",
    });
  //  create a session
  const userAgent = req.get("user-agent") || "";
  const session = await createSession({ userId: user._id, userAgent });
  console.log(session);
  //  create an access token
  const accessToken = await signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTTL"),
    }
  );

  //  Create a refresh token
  const refreshToken = await signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTTL"),
    }
  );

  return res.status(200).json({
    message: "User session created",
    data: {
      refreshToken,
      accessToken,
    },
  });
}
export async function getSessionsOfCurrentUser(req: Request, res: Response) {
  const userId = res.locals.user._doc._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).json({
    data: sessions,
  });
}

export async function deleteSessionOfCurrentUser(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.status(200).json({
    message: "Session Deleted",
    data: {
      accessToke: null,
      refreshToken: null,
    },
  });
}
