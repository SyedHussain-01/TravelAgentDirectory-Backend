const express = require("express");
const router = express.Router();
const {
  postPackageController,
} = require("../../controllers/packageControllers");

router.post(`/post-package`, postPackageController);

module.exports = router;
