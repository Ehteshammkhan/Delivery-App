import mongoose from "mongoose";
import { DB_NAME } from "../../constrants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODBURL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
