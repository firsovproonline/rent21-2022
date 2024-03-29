const { authJwt } = require("../middleware");
const controller = require("../controllers/lids.controller");
module.exports = function(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/lids", [authJwt.verifyToken,authJwt.isAdmin], controller.get);
  app.get("/lid", [authJwt.verifyToken,authJwt.isAdmin], controller.getID);
}
