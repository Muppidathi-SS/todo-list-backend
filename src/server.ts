import express from "express";
import { connectDB } from "./config/db";
import { User } from "./models/user.model";

const app = express();

const PORT = process.env.PORT;

app.get("/getcheck", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch data",
    });
  }
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
