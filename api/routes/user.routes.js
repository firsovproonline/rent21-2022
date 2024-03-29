const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer({
  dest: './temp'
})
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/user/photo", [authJwt.verifyToken, upload.single('file')], controller.postphoto);
  app.get("/user/photo", controller.photo);
  app.get("/user", [authJwt.verifyToken], controller.allAccess);
  app.get("/test/all", controller.allAccess);
  app.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/user/list",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.listUsers
  );

};
