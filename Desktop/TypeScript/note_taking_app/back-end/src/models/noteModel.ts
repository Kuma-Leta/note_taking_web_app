import { model, Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

interface Note extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}
const NoteSchema = new Schema<Note & Document>(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    user: {
      ref: "signup",
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const noteModel = mongoose.model("Notes", NoteSchema);
