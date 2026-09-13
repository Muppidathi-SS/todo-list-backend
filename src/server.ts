import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import Routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", Routes);

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
