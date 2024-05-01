import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to mongoDB successfully!");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectToMongoDB;
