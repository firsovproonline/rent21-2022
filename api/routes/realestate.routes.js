const controller = require("../controllers/realestate.controller");
module.exports = function(app) {
  app.get("/realestate/address", controller.address);
};
