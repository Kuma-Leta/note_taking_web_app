import express, { Express, NextFunction, Request, Response } from "express";
import { SignupModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "./generateToken";
import { AppError } from "../utils/appError";
export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const userAlreadyExists = await SignupModel.findOne({ email: email });
  if (userAlreadyExists) {
    new AppError("user already exists", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userAccount = new SignupModel({
    email: email,
    password: hashedPassword,
    name: name,
  });
  await userAccount.save();
  if (!userAccount) {
    new AppError("error in creating user", 400);
  }
  if (userAccount) {
    res.status(201).json({
      id: userAccount.id,
      name: userAccount.name,
      email: userAccount.email,
      token: generateToken(userAccount.id),
    });
  }
};
