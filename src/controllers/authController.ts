import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { createUserSchema, loginUserSchema } from "../dtos/userDTO";
import { generateToken } from "../utils/jwtUtils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
      return;
    }

    const { email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = new User({ email, password });
    await user.save();

    const token = generateToken({ id: user._id });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        email: user.email,
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = loginUserSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
      return;
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken({ id: user._id });

    res
      .status(200)
      .json({ message: "Login successful", token, email: user.email });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
