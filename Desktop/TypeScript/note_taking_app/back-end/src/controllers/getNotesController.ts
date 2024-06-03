import { AuthenticatedRequest } from "./../middleware/authMiddleware";
import express, { Express, NextFunction, Request, Response } from "express";
import { noteModel } from "../models/models";
export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
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
    res.status(200).json({
      status: "success",
      NoteResult,
      totalNumberOfPages,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Note can not be found",
    });
  }
};
