import { Router } from "express";
import {
  authLogOutHanlder,
  authLogInHanlder,
  authSignUpHanlder,
  getOnlineUsers,
} from "../controllers/auth";
import authenticateToken from "../middlewares/authenticateToken";
const router = Router();

router.post("/signup", authSignUpHanlder);
router.post("/login", authLogInHanlder);
router.get("/logout", authenticateToken, authLogOutHanlder);
router.get("/getOnlineUsers", authenticateToken, getOnlineUsers);

export default router;
