import { NextFunction, Request, Response } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    // TODO HANDLE ERROR
    return res.status(403).json({
      message: "Not authenticated",
    });
  }
  return next();
};

export default requireAuth;
