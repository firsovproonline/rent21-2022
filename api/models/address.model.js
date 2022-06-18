module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: Sequelize.STRING(64)
    },
    name: {
      type: Sequelize.STRING
    },
    tip: {
      type: Sequelize.STRING(64)
    },

  });
  return Address;
};
