import { noteModel } from "../models/noteModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
export const addNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const noteAdded = await noteModel.create({
      title,
      content,
      user: req.user._id,
    });
    if (noteAdded) {
      res.status(201).json(noteAdded);
    }
  } catch (error: any) {
    console.log(error);
  }
};
