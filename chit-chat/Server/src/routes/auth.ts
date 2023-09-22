import { Router } from "express";
import { authLogInHanlder, authSignUpHanlder } from "../controllers/auth";

const router = Router();

router.post("/signup", authSignUpHanlder);
router.post("/login", authLogInHanlder);

export default router;
