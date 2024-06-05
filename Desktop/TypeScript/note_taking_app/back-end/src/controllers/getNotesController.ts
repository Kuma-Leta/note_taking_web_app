import { AuthenticatedRequest } from "./../middleware/authMiddleware";
import express, { Express, NextFunction, Request, Response } from "express";
import { noteModel } from "../models/noteModel";
import { AppError } from "../utils/appError";

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  const currentPage = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const pageCount = await noteModel.countDocuments();
  const totalNumberOfPages = Math.floor(pageCount / limit);
  const skip = (currentPage - 1) * limit;
  const USER_ID: string | undefined = req.query.userId as string;
  const NoteResult = await noteModel
    .find({ user: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort({ modifiedOn: -1 });
  // console.log(NoteResult);
  if (!NoteResult) {
    new AppError("no Note found", 404);
  }
  res.status(200).json({
    status: "success",
    NoteResult,
    totalNumberOfPages,
  });
};
