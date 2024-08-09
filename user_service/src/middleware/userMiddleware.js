const User = require("../models/userModel"); // Import model User

// Middleware untuk memvalidasi input pengguna saat pendaftaran atau pembaruan
const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  // Cek format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  next(); // Lanjutkan ke middleware berikutnya atau route handler
};

// Middleware untuk memeriksa apakah email sudah terdaftar
const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    next(); // Lanjutkan ke middleware berikutnya atau route handler
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  validateUserInput,
  checkEmailExists,
};
