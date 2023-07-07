const express = require("express");
const router = express.Router();
const {
  postPackageController,
  getPackageController,
  getSinglePackageController,
  updatePackageController,
  deletePackageController
} = require("../../controllers/packageControllers");
const authenticate = require("../../middlewares/authenticate");

router.post(`/post-package`, authenticate, postPackageController);
router.get(`/get-package`, authenticate, getPackageController);
router.get(`/get-single-package`, authenticate, getSinglePackageController)
router.put(`/update-package`, authenticate, updatePackageController);
router.delete(`/delete-package`, authenticate, deletePackageController);

module.exports = router;
