const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

// Endpoint untuk mendapatkan semua pengaduan
router.get("/complaints", complaintController.getAllComplaints);

// Endpoint untuk mendapatkan pengaduan berdasarkan ID
router.get("/complaints/:id", complaintController.getComplaintById);

// Endpoint untuk membuat pengaduan baru
router.post("/complaints", complaintController.createComplaint);

// Endpoint untuk memperbarui pengaduan
router.put("/complaints/:id", complaintController.updateComplaint);

module.exports = router;
