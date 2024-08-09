const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// Middleware untuk memverifikasi token JWT
const authenticateToken = (req, res, next) => {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (token == null)
    return res.status(401).json({ message: "No token provided" });

  // Memverifikasi token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Menyimpan informasi pengguna ke objek req untuk digunakan di handler berikutnya
    req.user = user;
    next(); // Melanjutkan ke handler berikutnya
  });
};

module.exports = authenticateToken;
