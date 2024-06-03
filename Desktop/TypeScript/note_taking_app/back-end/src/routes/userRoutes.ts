import express from "express";
import { Router } from "express";
import { login } from "../controllers/loginController";
import { signup } from "../controllers/signupController";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
export default router;
