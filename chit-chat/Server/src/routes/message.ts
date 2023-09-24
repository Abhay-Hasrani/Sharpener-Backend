import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import { addMessageHandler } from "../controllers/message";

const router = Router();

// router.use("/", authenticateToken);
router.post("/add-message",authenticateToken, addMessageHandler);

export default router;
