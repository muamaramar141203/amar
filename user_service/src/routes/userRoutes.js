const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Mendapatkan daftar semua pengguna
router.get("/users", userController.getAllUsers);

// Mendaftar pengguna baru
router.post("/users", userController.createUser);

// Mendapatkan pengguna berdasarkan ID
router.get("/users/:id", userController.getUserById);

// Memperbarui pengguna berdasarkan ID
router.put("/users/:id", userController.updateUserById);

// Menghapus pengguna berdasarkan ID
router.delete("/users/:id", userController.deleteUserById);

module.exports = router;
