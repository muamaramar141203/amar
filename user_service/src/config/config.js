require("dotenv").config(); // Memuat variabel lingkungan dari file .env

const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/defaultdb",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret", // Misalkan Anda menyimpan secret key untuk JWT di sini
  PORT: process.env.PORT || 3000, // Port default jika tidak diset di lingkungan
  USER_SERVICE_URL:
    process.env.USER_SERVICE_URL || "http://user-service:3001/api/users",
  COMPLAINT_SERVICE_URL:
    process.env.COMPLAINT_SERVICE_URL ||
    "http://complaint-service:3002/api/complaints",
};

module.exports = config;
