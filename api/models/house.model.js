module.exports = (sequelize, Sequelize) => {
  const address = require("../models/address.model.js")(sequelize, Sequelize);
  const house_tip = require("../models/house_tip.model.js")(sequelize, Sequelize);
  const House = sequelize.define("house", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    addressUid: {
      type: Sequelize.STRING(64),
      references: {
        field: 'name',
        // ссылка на другую модель
        model: address,
        // название колонки модели-ссылки с первичным ключом
        key: 'uid',
      }
    },
    uid: {
      type: Sequelize.STRING(64)
    },
    name: {
      type: Sequelize.STRING
    },
    house: {
      type: Sequelize.STRING(16)
    },
    tip: {
      type: Sequelize.INTEGER,
      references: {
        // ссылка на другую модель
        model: house_tip,
        // название колонки модели-ссылки с первичным ключом
        key: 'id',
      }

    }
  });
  return House;
};
