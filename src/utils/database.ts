import mongoose from "mongoose";

let isConnectedToDB = false;

export const connectToDB = async () => {
  if (isConnectedToDB) console.log("db is already connected");
  if (!isConnectedToDB) {
    try {
      await mongoose.connect(process.env.MONGODB_URL!, {
        dbName: "share_prompt",
      });
      isConnectedToDB = true;
      console.log("db is successfully connected");
    } catch (error) {
      console.error(error);
    }
  }
};
