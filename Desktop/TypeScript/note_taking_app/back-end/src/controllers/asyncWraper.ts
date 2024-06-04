import { Request, Response, NextFunction } from "express";
const asyncWraper = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
export default asyncWraper;
