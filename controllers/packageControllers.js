const packages = require("../models/packageModel");
const sendResponse = require("../helpers/sharedHelpers");

const postPackageController = async (req, res) => {
  const {
    agent_id,
    packageName,
    destinations,
    duration,
    description,
    tour_fee,
    start_date,
    end_date,
    images,
  } = req.body;
  try {
    const ss = await packages.create({
      agent_id,
      packageName,
      destinations,
      duration,
      description,
      tour_fee,
      start_date,
      end_date,
      images,
    });
    sendResponse(res, 200, ss);
  } catch (error) {
    sendResponse(res, 400, null);
  }
};

module.exports = {
  postPackageController,
};
