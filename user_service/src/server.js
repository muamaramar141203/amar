const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv"); // Menambahkan dotenv
const app = express();
const userRoutes = require("./routes/userRoutes");

// Load variabel lingkungan dari .env file
dotenv.config();

// Menggunakan body-parser untuk menguraikan JSON
app.use(bodyParser.json());

// Menggunakan routes untuk user
app.use("/api", userRoutes);

// Route dasar untuk memastikan service berjalan
app.get("/", (req, res) => {
  res.send("User Service is running");
});

// Contoh rute yang berkomunikasi dengan Complaint Service
app.get("/api/complaints", async (req, res) => {
  try {
    const complaintServiceUrl =
      process.env.COMPLAINT_SERVICE_URL ||
      "http://complaint-service:3002/api/complaints";

    // Melakukan permintaan ke Complaint Service
    const response = await axios.get(complaintServiceUrl);

    // Mengirim kembali data yang diterima dari Complaint Service
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to communicate with Complaint Service" });
  }
});

// Middleware untuk menangani error yang tidak tertangani
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Menjalankan server pada port yang ditentukan
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});
