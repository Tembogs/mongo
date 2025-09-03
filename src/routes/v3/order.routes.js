import { Router } from "express";
import { createOrder, deleteOrders, getOrderId, getOrder  } from "../../controllers/order.controllers.js";

const router = Router();
router.post("/", createOrder);
router.get("/:id", getOrderId)
router.get("/", getOrder)
router.delete("/:id", deleteOrders)


export default router;