import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { noteModel } from "../models/noteModel";
import { AppError } from "../utils/appError";

export const saveEditedNote = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const saveResult = await noteModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      modifiedOn: req.body.modifiedOn,
    },
    { new: true }
  );
  if (!saveResult) {
    new AppError("error in accessing the notes", 404);
  }
  res.status(200).json({
    status: "success",
    saveResult,
    message: "updated successfully",
  });
};
export const getEditableNote = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const editResult = await noteModel.findById(req.params.id);
  console.log("editable Note:", editResult);
  if (!editResult) {
    new AppError("editable note not found", 404);
  }
  res.status(200).json({
    status: "success",
    result: editResult,
  });
};
