import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
// import AppError from "../utils/appError";

// const handleCastError = (err) => {
//     const message = `Invalid ${err.path}: ${err.value}`;
//     return new AppError(message, 400);
//   };

//   const handleDuplicateFieldsDb = (err) => {
//     const key = Object.keys(err.keyValue)[0];
//     const value = Object.values(err.keyValue)[0];
//     const message = `Duplicate field ${key}: ${value}.`;
//     return new AppError(message, 400);
//   };

//   const handleTokenExpiredError = () =>
//     new AppError("Your Token has Expired, Please Login again.", 401);
// //   const handleValidationError = (err:AppError) => {
// //     const errors = Object.values(err.errors).map((el) => el.message);
// //     console.log("errors", errors.join(". "));

// //     return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
// //   };

//   const handleJsonWebTokenError = (err:AppError) =>
//     new AppError("Invalid Token Please Login again", 401);
//   const sendErrorDev = (err:AppError, res:Response) => {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//       stack: err.stack,
//       error: err,
//     });
//   };

//   const sendErrorProduction = (err:AppError, res:Response) => {
//     // console.log("op", err);
//     // Operational error, trusted error: send message to client
//     if (err.isOperational) {
//       res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message,
//       });

//       // Programming error or other unknown error: dont't leak error details
//     } else {
//       // 1) Log error to the Server
//       console.error(`ERROR : ${err}`);

//       // 2) Send a generic message
//       res.status(500).json({
//         status: "error",
//         message: "Something went very wrong",
//       });
//     }
//   };

export default function GlobalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    if (err.statusCode === 400) {
      return res.status(400).json({
        message: err.message,
      });
    }
    // if(err.statusCode===400){}
    // if(err.statusCode===400){}
    // if(err.statusCode===400){}
  }
  if (err.code === 11000) {
    res.status(400).json({
      message: `${err.keyValue[Object.keys(err.keyPattern)[0]]} already exists`,
    });
  }
  res.status(400).json({ message: err.message });
}
