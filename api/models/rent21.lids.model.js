module.exports = (sequelize, Sequelize) => {
  const Rent21_lids = sequelize.define("rent21_lids", {
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
    presentation: {
      type: Sequelize.JSON
    }
  });
  return Rent21_lids;
};
