module.exports = (sequelize, Sequelize) => {
  const room_tip = require("../models/room_tip.model.js")(sequelize, Sequelize);
  const room_operation = require("../models/room_operation.model.js")(sequelize, Sequelize);
  const Room = sequelize.define("room", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    houseUid: {
      type: Sequelize.STRING(64)
    },
    uid: {
      type: Sequelize.STRING(64)
    },
    tip: {
      type: Sequelize.INTEGER,
      references: {
        // ссылка на другую модель
        model: room_tip,
        // название колонки модели-ссылки с первичным ключом
        key: 'id',
      }
    },
    operation: {
      type: Sequelize.INTEGER,
      references: {
        // ссылка на другую модель
        model: room_operation,
        // название колонки модели-ссылки с первичным ключом
        key: 'id',
      }
    },
    square: {
      type: Sequelize.DECIMAL,
    }
  });
  return Room;
};
