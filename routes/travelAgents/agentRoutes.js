const express = require("express");
const authenticate = require("../../middlewares/authenticate");
const {
  getAgentsController,
  updateAgentController,
  deleteAgentController
} = require("../../controllers/agentControllers");
const router = express.Router();

router.get(`/get-agencies`, authenticate, getAgentsController);
router.put(`/edit-agency`, authenticate, updateAgentController);
router.delete(`/delete-agency`, authenticate, deleteAgentController);

module.exports = router;
