module.exports = (sequelize, Sequelize) => {
  const Rent21_building = sequelize.define("rent21_building", {
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
    }
  });
  return Rent21_building;
};
