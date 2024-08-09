const mongoose = require("mongoose");

// Mendefinisikan skema untuk model pengaduan
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Membuat model dari skema
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
