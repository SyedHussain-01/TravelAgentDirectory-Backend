const packages = require("../models/packageModel");
const sendResponse = require("../helpers/sharedHelpers");

const postPackageController = async (req, res) => {
  try {
    if (req.user._id === req.body.agent_id) {
      const ss = await packages.create(req.body);
      sendResponse(res, 200, ss);
    } else {
      sendResponse(res, 400, {
        message: "Unauthorized",
      });
    }
  } catch (error) {
    sendResponse(res, 400, {
      message: "Error in creating package",
    });
  }
};

const getPackageController = async (req, res) => {
  const { agent_id } = req.query;
  try {
    const ss = await packages.find({
      agent_id,
    });
    sendResponse(res, 200, ss);
  } catch (error) {
    console.log(error);
    sendResponse(res, 200, {
      message: 'Failed to retrieve packages'
    })
  }
};

const getSinglePackageController = async (req, res) => {
  const { package_id } = req.query;
  try {
    const result = await packages.findById({ _id: package_id });
    sendResponse(res, 200, result);
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, {
      message: "Failed to get this package",
    });
  }
};

const updatePackageController = async (req, res) => {
  const { package_id } = req.query;
  const { _id } = req.user;
  const payload = req.body;
  try {
    const verify = await packages.findById({ _id: package_id });
    if (verify.agent_id === _id) {
      const result = await packages.updateOne({ _id: package_id }, payload);
      sendResponse(res, 200, result);
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, {
      message: "Update Failed",
    });
  }
};

const deletePackageController = async (req, res) => {
  const { package_id } = req.query;
  const { _id } = req.user;
  try {
    const verify = await packages.findById({ _id: package_id });
    if (verify.agent_id === _id) {
      const result = await packages.deleteOne({ _id: package_id });
      sendResponse(res, 200, result);
    }
  } catch (error) {
    sendResponse(res, 400, {
      message: "Failed to Delete!!!",
    });
  }
};

module.exports = {
  postPackageController,
  getPackageController,
  getSinglePackageController,
  updatePackageController,
  deletePackageController,
};
