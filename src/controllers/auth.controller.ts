import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      user: {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      userPassword,
      user.userPassword,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    console.log("LOGGED IN USER:", user.userEmail);

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
      (process.env.JWT_SECRET as string) ||
        "todo_jwt_secret_key_super_secure_2026",
      {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1h",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      id: user._id,
      userName: user.userName,
      userEmail: user.userEmail,
      token,
      user: {
        _id: user._id,
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed due to server error",
    });
  }
};
