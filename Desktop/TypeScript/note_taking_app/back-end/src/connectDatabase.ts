import mongoose from "mongoose";

export const connectDb = () => {
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
};
