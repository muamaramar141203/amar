const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware"); // Middleware otentikasi
const { MONGO_URI } = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware untuk parsing JSON
app.use(express.json());
app.use("/auth", authRoutes);

// Middleware untuk menangani error yang tidak tertangani
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Contoh penggunaan middleware otentikasi pada rute tertentu
app.get("/auth/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You have access to this protected route",
    user: req.user,
  });
});

// Koneksi ke MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mulai server
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
