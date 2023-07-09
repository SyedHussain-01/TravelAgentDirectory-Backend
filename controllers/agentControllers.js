const sendResponse = require("../helpers/sharedHelpers");
const users = require("../models/userModel");
const packages = require("../models/packageModel");

const getAgentsController = async (req, res) => {
  try {
    const ss = await users.find({ user_type: 0 });
    sendResponse(res, 200, ss);
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, {
      message: "Failed to retrieve travel agencies",
    });
  }
};

const updateAgentController = async (req, res) => {
  const { id } = req.query;
  try {
    const query1 = { user_type: 0 };
    const query2 = { _id: id };
    const agency = await users.find({ $and: [query1, query2] });
    if (agency) {
      const result = await users.updateOne(query2, req.body);
      sendResponse(res, 200, result);
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, {
      message: "Failed to update agency profile",
    });
  }
};

const deleteAgentController = async (req, res) => {
  const { id } = req.query;
  try {
    const query1 = { user_type: 0 };
    const query2 = { _id: id };
    const agency = await users.find({ $and: [query1, query2] });
    if (agency) {
      const resultAgency = await users.deleteOne(query2);
      const resultPackages = await packages.deleteMany({ agent_id: id });
      sendResponse(res, 200, {
        data: {
          agency: resultAgency,
          packages: resultPackages,
        },
      });
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, {
      message: "Failed to delete",
    });
  }
};

module.exports = {
  getAgentsController,
  updateAgentController,
  deleteAgentController,
};
