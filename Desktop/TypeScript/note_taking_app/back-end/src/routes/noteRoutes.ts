import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import asyncWraper from "../controllers/asyncWraper";
import {
  getEditableNote,
  saveEditedNote,
} from "../controllers/editNoteController";
import { searchNotes } from "../controllers/searchController";
import { addNote } from "../controllers/addNoteController";
import { getNotes } from "../controllers/getNotesController";
const router = express.Router();
router.get("/getNotes", protect, asyncWraper(getNotes));
router.post("/addNotes", protect, asyncWraper(addNote));
router.get("/searchNotes", protect, asyncWraper(searchNotes));
router.put(
  "/saveEditedNote/:id",
  protect,
  // isAuthenticated,
  asyncWraper(saveEditedNote)
);
router.get(
  "/getEditableNote/:id",
  protect,
  // isAuthenticated,
  asyncWraper(getEditableNote)
);
export default router;
