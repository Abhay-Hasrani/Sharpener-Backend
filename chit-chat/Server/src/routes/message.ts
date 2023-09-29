import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken";
import {
  addGroupMessageHandler,
  addMessageHandler,
  getGroupMessages,
  getMessages,
} from "../controllers/message";
import upload from "../services/multer_AWS_S3";

const router = Router();

// router.use("/", authenticateToken);
router.post(
  "/add-message",
  authenticateToken,
  upload.single("userFile"),
  addMessageHandler
);

router.post("/get-messages/:lastMessageId", authenticateToken, getMessages);

router.post(
  "/add-group-message",
  authenticateToken,
  upload.single("userFile"),
  addGroupMessageHandler
);

router.post(
  "/get-group-messages/:lastMessageId",
  authenticateToken,
  getGroupMessages
);

export default router;
