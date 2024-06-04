import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
const glebalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = err.statusCode || 500;
  const status: string = err.status || "error";
  res.status(statusCode).json({ status: err.status, message: err.message });
};
export default glebalErrorHandler;
