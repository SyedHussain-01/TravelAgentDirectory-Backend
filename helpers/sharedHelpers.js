const sendResponse = (res, statusCode, data) => {
  const pvtFields = ['_id', 'name', 'user_type', 'pass', 'email']
  if(Object.keys(data).includes(pvtFields[0,pvtFields.length-1])){
    pvtFields.forEach((element)=>{
      delete data[element]
    })
  }
  res.status(statusCode).json({
    data: statusCode !== 400 ? { count: data.length, data} : null,
    error: statusCode === 400 ? (data ? data : "Internal Server Error") : null,
  });
};

module.exports = sendResponse