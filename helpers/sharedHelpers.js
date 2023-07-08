const pvtFields = ["_id", "name", "user_type", "pass", "email"];

const removePvtFields = (data) => {
  if (Object.keys(data).includes(pvtFields[(0, pvtFields.length - 1)])) {
    pvtFields.forEach((element) => {
      delete data[element];
    });
  }
  return data;
};

const sendResponse = (res, statusCode, data) => {
  const finalData = [];
  if (Array.isArray(data)) {
    data.forEach((element) => {
      element = removePvtFields(element.toObject());
      finalData.push(element);
    });
  } else {
    removePvtFields(data);
  }

  res.status(statusCode).json({
    data:
      statusCode !== 400
        ? { count: data.length, data: finalData.length > 0 ? finalData : data }
        : null,
    error: statusCode === 400 ? (data ? data : "Internal Server Error") : null,
  });
};

module.exports = sendResponse;
