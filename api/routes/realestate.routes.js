const controller = require("../controllers/realestate.controller");
const {authJwt} = require("../middleware");
module.exports = function(app) {
  app.get("/realestate/address", controller.address);
  app.get("/realestate/room", [authJwt.verifyToken], controller.room);
  app.get("/realestate/roomfromaddress", [authJwt.verifyToken], controller.roomfromaddress);
  app.get("/realestate/house", controller.house);
  app.get("/realestate/spr", controller.spr);
  app.get("/realestate/oldaddress", controller.oldAddress);
  app.get("/realestate/oldLids", controller.oldlids);
  app.post("/realestate/lids", controller.lids);
  app.post("/realestate/rent21address", controller.rent21address);
  app.get("/realestate/rent21uid", controller.rent21uid);

};
