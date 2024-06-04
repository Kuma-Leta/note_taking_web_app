import express from "express";
import { Router } from "express";
import { login } from "../controllers/loginController";
import { signup } from "../controllers/signupController";
import asyncWraper from "../controllers/asyncWraper";
const router = express.Router();
router.post("/signup", asyncWraper(signup));
router.post("/login", asyncWraper(login));
export default router;
