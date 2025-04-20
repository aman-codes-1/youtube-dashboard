import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT || 4000;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
    throw err;
  }
};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();
