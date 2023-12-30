class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture and store the stack trace for this error instance
    Error.captureStackTrace(this, this.constructor);

    // Ensure the correct prototype chain
    // Object.setPrototypeOf(this, Error.prototype);
  }
}

export default AppError;
