import Jwt from "jsonwebtoken";
// import { auth } from "./../../front-end/src/components/firebaseConfig";
import express, { Express, NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose, { Schema } from "mongoose";
import { protect, AuthenticatedRequest } from "./middleware/authMiddleware";
import bcrypt from "bcrypt";
import { SignupModel, noteModel } from "./models/models";
import { connectDb } from "./connectDatabase";
const app: Express = express();
app.use(express.json());
app.use(cors());
// const port: any = process.env.PORT;

connectDb();
const router = express.Router();
app.post("/signup");
app.post("/login");

app.get("/getNotes", protect);
app.post("/addNotes", protect);
app.get("/searchNotes", protect);
app.put(
  "/saveEditedNote/:id",
  protect
  // isAuthenticated,
);
app.get(
  "/getEditableNote/:id",
  protect
  // isAuthenticated,
);

// const DbString: string =
const port: number = 5001;
app.listen(port, () => {
  console.log(
    `the server is runnning on port :${port} and 127.0.0.1 address ......`
  );
});
