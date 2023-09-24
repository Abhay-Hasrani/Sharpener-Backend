import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import { addMessageHandler, getMessages } from "../controllers/message";

const router = Router();

// router.use("/", authenticateToken);
router.post("/add-message",authenticateToken, addMessageHandler);

router.post("/get-messages",authenticateToken, getMessages);

export default router;
