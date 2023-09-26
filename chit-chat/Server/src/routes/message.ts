import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import {
  addGroupMessageHandler,
  addMessageHandler,
  getGroupMessages,
  getMessages,
} from "../controllers/message";

const router = Router();

// router.use("/", authenticateToken);
router.post("/add-message", authenticateToken, addMessageHandler);

router.post("/get-messages/:lastMessageId", authenticateToken, getMessages);

router.post("/add-group-message", authenticateToken, addGroupMessageHandler);

router.post(
  "/get-group-messages/:lastMessageId",
  authenticateToken,
  getGroupMessages
);

export default router;
