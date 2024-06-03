import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { noteModel } from "../models/noteModel";
export const searchNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page: number = Number(req.params.page) || 1;
    const perPage: number = Number(req.params.pageNumber) || 10;
    const skip = (page - 1) * perPage;
    const SearchQuery: string | undefined = req.query.searchQuery as string;
    const regQuery = new RegExp(SearchQuery, "i");
    if (!SearchQuery) {
      return res
        .status(400)
        .json({ status: "error", message: "search query required" });
    }

    const searchResult = await noteModel
      .find({
        $or: [
          { title: { $regex: regQuery } },
          { content: { $regex: regQuery } },
        ],
      })
      .skip(skip)
      .limit(perPage);
    res.status(200).json({
      status: "success",
      message: searchResult,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error ", message: "Internal Server Error" });
  }
};
