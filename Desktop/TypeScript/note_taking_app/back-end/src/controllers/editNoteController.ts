import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
import { noteModel } from "../models/noteModel";
export const saveEditedNote = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
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
      return res.status(404).json({
        status: "fail",
        message: "Not Found",
      });
    }
    res.status(200).json({
      status: "success",
      saveResult,
      message: "updated successfully",
    });
  } catch (error: any) {
    console.log(error);
  }
};
export const getEditableNote = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const editResult = await noteModel.findById(req.params.id);
    console.log("editable Note:", editResult);
    if (!editResult) {
      return res.status(404).json({ status: "fail", message: "not found" });
    }
    res.status(200).json({
      status: "success",
      result: editResult,
    });
  } catch (error: any) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
};
