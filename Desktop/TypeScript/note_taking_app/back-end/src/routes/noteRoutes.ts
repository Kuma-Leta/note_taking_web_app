import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getEditableNote,
  saveEditedNote,
} from "../controllers/editNoteController";
import { searchNotes } from "../controllers/searchController";
import { addNote } from "../controllers/addNoteController";
import { getNotes } from "../controllers/getNotesController";
const router = express.Router();
router.get("/getNotes", protect, getNotes);
router.post("/addNotes", protect, addNote);
router.get("/searchNotes", protect, searchNotes);
router.put(
  "/saveEditedNote/:id",
  protect,
  // isAuthenticated,
  saveEditedNote
);
router.get(
  "/getEditableNote/:id",
  protect,
  // isAuthenticated,
  getEditableNote
);
export default router;
