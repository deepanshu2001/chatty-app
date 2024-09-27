import express from "express";
const router=express.Router();
import { login,logout,signUp } from "../controllers/authcontroller.js";
router.post('/login',login);
router.post('/logout',logout);
router.post('/signUp',signUp);

export default router;