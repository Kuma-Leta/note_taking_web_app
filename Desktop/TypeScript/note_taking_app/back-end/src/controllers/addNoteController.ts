import { noteModel } from "../models/noteModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { AppError } from "../utils/appError";
export const addNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const noteAdded = await noteModel.create({
    title,
    content,
    user: req.user._id,
  });
  if (!noteAdded) {
    new AppError("error in creating note", 400);
  }
  if (noteAdded) {
    res.status(201).json(noteAdded);
  }
};
