const { authJwt } = require("../middleware");
const controller = require("../controllers/map.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/map", [authJwt.verifyToken,authJwt.isAdmin], controller.mapget);
};
