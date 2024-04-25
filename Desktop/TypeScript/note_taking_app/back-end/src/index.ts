import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose, { Schema } from "mongoose";
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
interface signup {
  username: string;
  password: string;
}
const signupSchema = new Schema<signup & Document>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});
const SignupModel = mongoose.model("Signup", signupSchema);
app.get("/login", async (req: Request, res: Response) => {
  console.log(req.query);
  const { username, password } = req.query;
  try {
    if (typeof username === "string" && typeof password === "string") {
      const result: any = await SignupModel.findOne({
        username: username,
        password: password,
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
});
const noteModel = mongoose.model("Notes", NoteSchema);
app.get("/searchNotes", async (req: Request, res: Response) => {
  try {
    const SearchQuery: string | undefined = req.query.searchQuery as string;
    const regQuery = new RegExp(SearchQuery, "i");
    if (!SearchQuery) {
      return res
        .status(400)
        .json({ status: "error", message: "search query required" });
    }

    const searchResult = await noteModel.find({
      $or: [{ title: { $regex: regQuery } }, { content: { $regex: regQuery } }],
    });
    res.status(200).json({
      status: "success",
      message: searchResult,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error ", message: "Internal Server Error" });
  }
});
app.get("/getNotes", async (req: Request, res: Response) => {
  try {
    const NoteResult = await noteModel.find();
    console.log(NoteResult);
    res.status(200).json({
      status: "success",
      NoteResult,
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
app.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const signup = await SignupModel.create(req.body);
    res
      .status(201)
      .json({ message: "congrats on your account creation !", data: signup });
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
// const DbString: string =
const port: number = 5001;
app.listen(port, () => {
  console.log(
    `the server is runnning on port :${port} and 127.0.0.1 address ......`
  );
});
