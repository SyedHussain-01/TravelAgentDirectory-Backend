const { postPackageController } = require("../../controllers/packageControllers")

const packageRoutes = (app, baseRoute) => {
  app.post(`${baseRoute}/post-package`, postPackageController);
};

module.exports = packageRoutes;
