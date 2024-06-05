import { SignupModel } from "../models/userModel";
import express, { Express, NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "./generateToken";
import { AppError } from "../utils/appError";

export const login = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const userAccount = await SignupModel.findOne({ email });
  if (userAccount && (await bcrypt.compare(password, userAccount.password))) {
    res.status(200).json({
      id: userAccount._id,
      email: userAccount.email,
      name: userAccount.name,
      token: generateToken(userAccount.id),
    });
  } else {
    new AppError("invalid user credential", 400);
  }
};
