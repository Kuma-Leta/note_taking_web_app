// import { auth } from "./../../front-end/src/components/firebaseConfig";
import express, { Express, NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const app: Express = express();
app.use(express.json());
app.use(cors());
// const port: any = process.env.PORT;
const db_connection_string: string | undefined =
  process.env.CONNECTION_STRING?.replace(
    "<password>",
    process.env.PASSWORD ?? ""
  );
if (!db_connection_string) {
  console.error("Connection string is not defined.");
  process.exit(1); // Exit the process if the connection string is not defined
}
mongoose
  .connect(db_connection_string)
  .then((result) => console.log("db connected successfully"))
  .catch((error: any) => {
    console.log(`error while connecting to  :${error}`);
  });
declare module "express" {
  interface Request {
    userId?: string;
  }
}
// const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const idToken = req.headers.authorization?.split("Bearer")[1];
//     if (!idToken) {
//       return res.status(401).json({ message: "unauthorized" });
//     }
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     if (!decodedToken) {
//       return res.status(401).json({ message: "unauthorized" });
//     }
//     req.userId = decodedToken.uid;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "unauthorized" });
//   }
// };
interface signup {
  name: string;
  password: string;
  email: string;

  createdAt: Date;
  modifiedOn: Date;
}
const signupSchema = new Schema<signup & Document>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },

  email: {
    type: String,
    required: [true, "you must provide email"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedOn: {
    type: Date,
    default: Date.now(),
  },
});
const SignupModel = mongoose.model("Signup", signupSchema);
app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userAccount = await SignupModel.create({
      email: email,
      password: hashedPassword,
      name: name,
      createdAt: Date.now(),
      modifiedOn: Date.now(),
    });
    res.status(201).json({ status: "success", userAccount });
  } catch (error: any) {
    let statusCode = 500;
    let message: string = "internal server error";
    if (error.code === 11000) {
      message = "username already exists";
      statusCode = 404;
    }
    console.log("error creating the resource");
    if (error.name === "ValidationError") {
      statusCode = 400;
      message = "validation error";
    }
    res.status(statusCode).json({
      message: message,
      status: statusCode,
    });
  }
});
app.post("/login", async (req: Request, res: Response) => {
  console.log(req.query);
  const { username, password, userId } = req.query;
  try {
    if (
      typeof username === "string" &&
      typeof password === "string" &&
      typeof userId === "string"
    ) {
      const result: any = await SignupModel.findOne({
        username: username,
        password: password,
        userId: userId,
      });
      if (result) {
        res.status(200).json({
          status: "success",
          message: " logged in successfully",
          data: result,
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});
interface Note {
  title: string;
  content: string;
  userID: string;
  modifiedOn: Date;
}
const NoteSchema = new Schema<Note & Document>({
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
  userID: {
    type: String,
    required: true,
  },
  modifiedOn: {
    type: Date,
    required: true,
  },
});
const noteModel = mongoose.model("Notes", NoteSchema);
app.get(
  "/searchNotes",
  // isAuthenticated,
  async (req: Request, res: Response) => {
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
  }
);
app.put(
  "/saveEditedNote/:id",
  // isAuthenticated,
  async (req: Request, res: Response) => {
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
  }
);
app.get(
  "/getEditableNote/:id",
  // isAuthenticated,
  async (req: Request, res: Response) => {
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
      res
        .status(500)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  }
);
app.get("/getNotes", async (req: Request, res: Response) => {
  try {
    const currentPage = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const pageCount = await noteModel.countDocuments();
    const totalNumberOfPages = Math.floor(pageCount / limit);
    const skip = (currentPage - 1) * limit;
    const USER_ID: string | undefined = req.query.userId as string;
    const NoteResult = await noteModel
      .find({ userID: USER_ID })
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
});
app.post("/addNotes", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const Notes_to_be_added = await noteModel.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Note saved successfully",
      result: {
        Notes_to_be_added,
      },
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      // Extract validation error messages
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res.status(400).json({
        status: "fail",
        message: "Insert the right Note please",
        errors: validationErrors,
      });
    } else {
      // For other types of errors
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
});

// const DbString: string =
const port: number = 5001;
app.listen(port, () => {
  console.log(
    `the server is runnning on port :${port} and 127.0.0.1 address ......`
  );
});
