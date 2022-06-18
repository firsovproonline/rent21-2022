const controller = require("../controllers/shop.controller");
module.exports = function(app) {
  app.get("/shop/catalog", controller.catalog);
};
