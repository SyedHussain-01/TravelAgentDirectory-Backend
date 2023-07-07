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
    sendResponse(res, 400, {
      message: "Error in creating package"
    });
  }
};

const getPackageController =  async (req, res) => {
  const { agent_id } = req.query;
  try {
    const ss = await packages.find({
      agent_id,
    });
    sendResponse(res, 200, ss)
  } catch (error) {
    console.log(error)
  }
}

const getSinglePackageController =  async (req, res) => {
  const { package_id } = req.query
  try {
    const result = await packages.findById({ _id: package_id })
    sendResponse(res, 200, result)
  } catch (error) {
    console.log(error)
    sendResponse(res, 400, {
      message:'Failed to get this package'
    })
  }
}

const updatePackageController = async (req, res) => {
  const { package_id } = req.query;
  const payload = req.body;
  try {
    const result = await packages.updateOne({ _id: package_id }, payload);
    sendResponse(res, 200, result)
  } catch (error) {
    sendResponse(res, 400, {
      message:'Update Failed'
    })
  }
}

const deletePackageController = async (req, res) => {
  const { package_id } = req.query;
  try {
    const result = await packages.deleteOne({ _id: package_id });
    sendResponse(res, 200, result)
  } catch (error) {
    sendResponse(res, 400, {
      message: 'Failed to Delete!!!'
    })
  }
}

module.exports = {
  postPackageController,
  getPackageController,
  getSinglePackageController,
  updatePackageController,
  deletePackageController,
};
