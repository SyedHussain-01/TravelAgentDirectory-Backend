const express = require("express");
const router = express.Router();
const {
  postPackageController,
} = require("../../controllers/packageControllers");
const authenticate = require("../../middlewares/authenticate");

router.post(`/post-package`, authenticate, postPackageController);

module.exports = router;
