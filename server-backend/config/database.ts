import mongoose from "mongoose";

const connect = () =>
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

export default connect;
