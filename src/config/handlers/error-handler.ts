import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging purposes
  console.error("err", err);

  // Determine the status code and message based on the error type
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send a structured error response to the client
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
