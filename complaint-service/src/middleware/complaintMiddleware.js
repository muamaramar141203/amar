const complaintMiddleware = (req, res, next) => {
  // Log informasi request
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);

  // Lanjutkan ke middleware berikutnya atau handler route
  next();
};

module.exports = complaintMiddleware;
