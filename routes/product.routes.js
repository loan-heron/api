const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares")
const admin = require("../middlewares/admin.middlewares")
const logger = require("../middlewares/logger.middlewares")

const productController = require("../controllers/product.controllers");

// Routes pour les produits
router.get("/", logger, productController.getProducts);
router.post("/", logger, auth, admin, productController.createProduct);
router.delete("/:id", logger, auth, admin, productController.deleteProduct);
router.put("/:id", logger, auth, admin, productController.updateProduct);
router.get("/:id", logger, productController.getProductById);

module.exports = router;