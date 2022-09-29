const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    logging: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.address = require("../models/address.model.js")(sequelize, Sequelize);
db.realestate_opp = require("../models/realestate.opp.model.js")(sequelize, Sequelize);
db.realestate_client_opp = require("../models/realestate.client.opp.model.js")(sequelize, Sequelize);
db.realestate_client_status = require("../models/realestate.client.status.model")(sequelize, Sequelize);

db.realestate_client_item = require("../models/realestate.client.model.js")(sequelize, Sequelize);


db.house = require("../models/house.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.house_tip = require("../models/house_tip.model.js")(sequelize, Sequelize);
db.room_tip = require("../models/room_tip.model.js")(sequelize, Sequelize);
db.room_operation = require("../models/room_operation.model.js")(sequelize, Sequelize);
db.shop_catalog = require("../models/shop_catalog.js")(sequelize, Sequelize);
db.cian_fid = require("../models/cian_fid.model.js")(sequelize, Sequelize);
db.cian_PropertyType = require("../models/cian_PropertyType.model.js")(sequelize, Sequelize);
// db.address.belongsToMany(db.role, { });
db.Rent21_address = require("../models/rent21.address.model.js")(sequelize, Sequelize);
db.Rent21_building = require("../models/rent21.building.model.js")(sequelize, Sequelize);
db.Rent21_linc = require("../models/rent21.linc.model.js")(sequelize, Sequelize);
db.Rent21_ob = require("../models/rent21.ob.model.js")(sequelize, Sequelize);
db.Rent21_all = require("../models/rent21.all.mogel.js")(sequelize, Sequelize);
db.Setings = require("../models/setings.model.js")(sequelize, Sequelize);
db.Rent21_lids = require("../models/rent21.lids.model.js")(sequelize, Sequelize);
db.Rent21_owner = require("../models/rent21.owner.model.js")(sequelize, Sequelize);

db.Rent21_export = require("../models/export.model.js")(sequelize, Sequelize);
db.Rent21_report = require("../models/report.model.js")(sequelize, Sequelize);
db.Rent21_contact = require("../models/rent21.contact.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
