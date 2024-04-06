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
          message: "User logged in successfully",
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

app.post("/signup", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const signup = await SignupModel.create(req.body);
    res.status(201).json({ message: "successfully signed up", data: signup });
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
const port: number = 5000;
app.listen(port, () => {
  console.log(
    `the server is runnning on port :${port} and 127.0.0.1 address ......`
  );
});
