import { Router } from "express";
import { addUsersToGroup, createGroup, getAllGroups, makeGroupAdmins, removeUsersFromGroup } from "../controllers/group";
import authenticateToken from "../middlewares/authenticateToken";
const router = Router();

router.post("/create-group", authenticateToken, createGroup);

router.get("/all-groups", authenticateToken, getAllGroups);

router.post("/make-admins",authenticateToken,makeGroupAdmins)

router.post("/add-users",authenticateToken,addUsersToGroup)

router.post("/remove-users",authenticateToken,removeUsersFromGroup)

export default router;
