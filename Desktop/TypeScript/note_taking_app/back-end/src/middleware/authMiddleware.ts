import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SignupModel } from "../models/userModel";
// declare global {
//   namespace Express {
//     interface Request {
//       user?: Document<any, any, any> | null;
//     }
//   }
// }
export interface AuthenticatedRequest extends Request {
  user?: any;
}
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded: JwtPayload | String = jwt.verify(
        token,
        process.env.JWT_SECRET || " "
      ) as JwtPayload;
      //get user from the token
      req.user = await SignupModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "unauthorized" });
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};
