import { Request, Response } from "express";
// import config from "config";
import { validatePassword } from "../services/users.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/sessions.service";
import { signJwt } from "../utils/jwt.utils";
import config from "../config/default";

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
  //  create an access token
  const payload = { user, session: session._id };
  // console.log({ user3: user });
  const accessToken = await signJwt(payload, {
    // expiresIn: config.get<string>("accessTokenTTL"),
    expiresIn: config.accessTokenTTL,
  });

  //  Create a refresh token
  const refreshToken = await signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      // expiresIn: config.get<string>("refreshTokenTTL"),
      expiresIn: config.refreshTokenTTL,
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 300000, // 5 Minutes
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 3.154e10, //1 year
  });

  return res.status(200).json({
    message: "User session created",
    data: {
      refreshToken,
      accessToken,
    },
  });
}
export async function getSessionsOfCurrentUser(req: Request, res: Response) {
  console.log("req.user");
  console.log(req.user);
  const userId = req.user._doc._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).json({
    data: sessions,
  });
}

// {
// '$__': { activePaths: { paths: [Object], states: [Object] }, skipId: true },
// '$isNew': false,
// _doc: {
// _id: '65286f8e55216fcd205eac89',
// email: 'test123@gmail.com',
// name: 'Hamza test 1',
// password: '$2a$10$l7WqtgUjTGJ54k5Au1fO2Ou52VpjJlnNFaWVxil6dXaGEuswIc4Ie',
// createdAt: '2023-10-12T22:13:34.935Z',
// updatedAt: '2023-10-12T22:13:34.935Z',
// __v: 0
// },
// session: '653eca1d46b363c282c2bad0',
// iat: 1698613789,
// exp: 1698614449
//   node-kafka-booking-microservice-user-service-1  | }
export async function deleteSessionOfCurrentUser(req: Request, res: Response) {
  const sessionId = req.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  return res.status(200).json({
    message: "Session Deleted",
    data: {
      accessToke: null,
      refreshToken: null,
    },
  });
}
