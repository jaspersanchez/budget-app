import mongoose, { MongooseError } from "mongoose";
import { env } from "./utils/env";

const connectDB = async () => {
  const mongURI = env.mongoURI;

  try {
    await mongoose.connect(mongURI);

    console.log("connected to DB");
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(`MongoDB URI Error: ${error.message}`);

      process.exit(1);
    }
  }
};

export default connectDB;
