module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
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
