module.exports = (sequelize, Sequelize) => {
  const Rent21_all = sequelize.define("rent21_all", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
    },
    fields: {
      type: Sequelize.JSON
    },
    cian: {
      type: Sequelize.JSON
    },
    tip: {
      type: Sequelize.STRING(16)
    },
  });
  return Rent21_all;
};
