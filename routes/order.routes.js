const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares")
const admin = require("../middlewares/admin.middlewares")
const logger = require("../middlewares/logger.middlewares")

const orderController = require("../controllers/order.controllers");

// Routes pour les commandes
router.get("/", logger, auth, admin, orderController.getOrders);
router.get("/me", logger, auth, admin, orderController.getMyOrders);
router.post("/", logger, auth, admin, orderController.createOrder);
router.delete("/:id", logger, auth, admin, orderController.deleteOrder);
router.put("/:id", logger, auth, admin, orderController.updateOrder);
router.get("/:id", logger, auth, admin, orderController.getOrderById);

module.exports = router;