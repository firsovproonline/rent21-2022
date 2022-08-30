const controller = require("../controllers/foto.controller");
module.exports = function(app) {
  app.get("/foto/list", controller.list);
  app.get("/foto/get", controller.get);
}
