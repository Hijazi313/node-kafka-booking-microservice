import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/sessions.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  // console.log(1, accessToken1);
  // const accessToken = get(req, "headers.authorization", "").replace(
  //   /^Bearer\s/,
  //   ""
  // );

  // Get Refresh access token from request
  // console.log(req.headers);
  // const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();
  const { decoded, expired } = await verifyJwt(accessToken);
  // console.log(decoded);
  if (decoded) {
    // console.log(decoded);
    req.user = decoded;
    return next();
  }

  // console.log(1);
  // console.log({ expired, refreshToken });
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: refreshToken as string,
    });
    // console.log("first", newAccessToken);
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 300000,
      });
      const result = await verifyJwt(newAccessToken);
      req.user = result.decoded;
    }
    return next();
  }
  return next();
};
export default deserializeUser;
