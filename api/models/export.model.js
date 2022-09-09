module.exports = (sequelize, Sequelize) => {
  const Rent21_export = sequelize.define("rent21_export", {
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
    name: {
      type: Sequelize.STRING(48)
    },
    tip: {
      type: Sequelize.STRING(16)
    },
  });
  return Rent21_export;
};
