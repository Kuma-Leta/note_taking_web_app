import { model, Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
interface signup {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  // token:ge
}
const signupSchema = new Schema<signup & Document>(
  {
    name: {
      type: String,
      required: [true, "you must provide name"],
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "you must provide password"],
    },

    email: {
      type: String,
      required: [true, "you must provide email"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"],
    },
  },
  { timestamps: true }
);
export const SignupModel = model("Signup", signupSchema);
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
