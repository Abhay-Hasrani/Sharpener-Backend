import { Router } from "express";
import { authSignUpHanlder } from "../controllers/auth";

const router = Router();

router.post("/signup", authSignUpHanlder);

export default router;
