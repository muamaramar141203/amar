const Complaint = require("../models/complaintModel");

// Mendapatkan semua pengaduan
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan pengaduan berdasarkan ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
      res.json(complaint);
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Membuat pengaduan baru
exports.createComplaint = async (req, res) => {
  const complaint = new Complaint({
    employeeId: req.body.employeeId,
    subject: req.body.subject,
    description: req.body.description,
  });

  try {
    const newComplaint = await complaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Memperbarui pengaduan
exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
      complaint.status = req.body.status || complaint.status;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: "Complaint not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
