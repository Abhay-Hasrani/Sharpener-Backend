import { Router } from "express";
import { createGroup } from "../controllers/group";
import authenticateToken from "../middlewares/authenticateToken";
const router = Router();

router.use("/create-group", authenticateToken,createGroup);

export default router;
