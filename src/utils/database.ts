import mongoose from "mongoose";

let isConnectedToDB = false;

export const connectToDB = async () => {
  mongoose.set({
    strictQuery: true,
  });
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
