import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { noteModel } from "../models/noteModel";
import AppError from "../utils/appError";
export const searchNotes = async (req: AuthenticatedRequest, res: Response) => {
  const page: number = Number(req.params.page) || 1;
  const perPage: number = Number(req.params.pageNumber) || 10;
  const skip = (page - 1) * perPage;
  const SearchQuery: string | undefined = req.query.searchQuery as string;
  const regQuery = new RegExp(SearchQuery, "i");
  if (!SearchQuery) {
    new AppError("search query required", 400);
  }
  const searchResult = await noteModel
    .find({
      $or: [{ title: { $regex: regQuery } }, { content: { $regex: regQuery } }],
    })
    .skip(skip)
    .limit(perPage);
  if (!searchResult) {
    new AppError("no search result found", 400);
  }
  res.status(200).json({
    status: "success",
    message: searchResult,
  });
};
