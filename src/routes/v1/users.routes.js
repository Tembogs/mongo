import { Router } from "express";
import { createUser, deleteUsers, getUserId, getUsers, updateUsers } from "../../controllers/users.controllers.js";

const router = Router();
router.post("/", createUser);
router.get("/:id", getUserId)
router.get("/", getUsers)
router.put("/:id", updateUsers)
router.delete("/:id", deleteUsers)



export default router;