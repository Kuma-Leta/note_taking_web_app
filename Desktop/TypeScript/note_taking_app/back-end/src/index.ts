import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import { connectDb } from "./connectDatabase";
const app: Express = express();
app.use(express.json());
app.use(cors());
// const port: any = process.env.PORT;

connectDb();
app.use("api/users", userRoutes);
app.use("api/users", noteRoutes);
const port: number = 5001;
app.listen(port, () => {
  console.log(
    `the server is runnning on port :${port} and 127.0.0.1 address ......`
  );
});
