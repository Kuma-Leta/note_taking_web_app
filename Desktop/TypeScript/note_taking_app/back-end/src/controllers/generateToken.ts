import Jwt from "jsonwebtoken";
export const generateToken = (id: string) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};
