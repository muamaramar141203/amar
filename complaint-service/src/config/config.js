// Mengimpor dotenv untuk memuat variabel lingkungan dari file .env
require("dotenv").config();

module.exports = {
  // URL koneksi MongoDB untuk complaint service
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/complaintdb",

  // Konfigurasi lain jika diperlukan
  // Misalnya, jika Anda perlu menambahkan konfigurasi lain untuk komunikasi antar layanan
};
