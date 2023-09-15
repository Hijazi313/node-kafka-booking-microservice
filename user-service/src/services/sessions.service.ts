import { FilterQuery, UpdateQuery } from "mongoose";
import Sessions, { SessionDocument } from "../models/sessions.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./users.service";
import config from "config";

export async function createSession(sessionProps: {
  userId: string;
  userAgent: string;
}) {
  const { userAgent, userId } = sessionProps;
  const session = await Sessions.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Sessions.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Sessions.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = await verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "_id")) return false;

  const session = await Sessions.findById(get(decoded, "session"));

  // console.log(session);
  if (!session || !session.valid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;

  //  create an access token
  const accessToken = await signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTTL"),
    }
  );

  return accessToken;
}
