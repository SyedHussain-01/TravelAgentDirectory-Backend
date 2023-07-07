const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: statusCode,
    data: statusCode !== 400 ? data : null,
    error: statusCode === 400 ? (data ? data : "Internal Server Error") : null,
  });
};

module.exports = sendResponse