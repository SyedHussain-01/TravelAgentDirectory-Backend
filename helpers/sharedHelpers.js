const sendResponse = (res, statusCode, data) => {
  if (data && data._id) {
    data = data.toObject();
    delete data._id;
  }
  res.status(statusCode).json({
    status: statusCode,
    data: statusCode !== 400 ? data : null,
    error: statusCode === 400 ? (data ? data : "Internal Server Error") : null,
  });
};

module.exports = sendResponse