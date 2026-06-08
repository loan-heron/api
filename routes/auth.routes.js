const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares")
const admin = require("../middlewares/admin.middlewares")
const logger = require("../middlewares/logger.middlewares")

const authController = require("../controllers/auth.controllers");

// Routes pour l'authentification
router.post("/register", logger, authController.createUser);
router.post("/login", logger, authController.connectUser);

module.exports = router;