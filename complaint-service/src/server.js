const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const complaintRoutes = require("./routes/complaintRoutes");
const complaintMiddleware = require("./middleware/complaintMiddleware"); // Tambahkan middleware
const { DB_URI } = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());
app.use(complaintMiddleware); // Gunakan middleware
app.use("/api", complaintRoutes);

// Connect to MongoDB
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Contoh rute yang berkomunikasi dengan User Service
app.get("/api/users", async (req, res) => {
  try {
    const userServiceUrl =
      process.env.USER_SERVICE_URL || "http://user-service:3001/api/users";

    // Melakukan permintaan ke User Service
    const response = await axios.get(userServiceUrl);

    // Mengirim kembali data yang diterima dari User Service
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: "Failed to communicate with User Service" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Complaint Service is running on port ${PORT}`);
});
