const { authJwt } = require("../middleware");
const controller = require("../controllers/seting.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/setings", [authJwt.verifyToken,authJwt.isAdmin], controller.setings);
  app.get("/setings", [authJwt.verifyToken], controller.setingsSmall);
  app.post("/setings", [authJwt.verifyToken,authJwt.isAdmin], controller.savesetings);

};
