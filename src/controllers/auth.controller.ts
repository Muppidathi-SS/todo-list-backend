import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({
        message: "All fields (userName, userEmail, userPassword) are required",
      });
    }
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = await User.create({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });
    console.log("REGISTERED USER:", user);
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

