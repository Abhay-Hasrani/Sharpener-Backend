import { Router } from "express";
import { authSignUpHanlder } from "../controllers/auth";

const router = Router();

router.post("/signUp", authSignUpHanlder);

export default router;
