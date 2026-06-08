const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares")
const admin = require("../middlewares/admin.middlewares")
const logger = require("../middlewares/logger.middlewares")

const userController = require("../controllers/user.controllers");

// Routes gérer les admins
router.put("/admin/set/:id", auth, admin, logger, userController.setAdminUser);
router.get("/admin/:id", auth, admin, logger, userController.getAdminUserById);
router.get("/admin", auth, admin, logger, userController.getAdminUsers);

// Routes gérer les utilisateurs
router.get("/", auth, admin, logger, userController.getUsers);
router.get("/:id", auth, admin, logger, userController.getUserById);
router.delete("/:id", auth, admin, logger, userController.deleteUser);

module.exports = router;