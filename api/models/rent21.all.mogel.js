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
    tip: {
      type: Sequelize.STRING(16)
    },
    building:{
      type: Sequelize.JSON
    },
    owners:{
      type: Sequelize.JSON
    },
    contact:{
      type: Sequelize.JSON
    },
    address:{
      type: Sequelize.JSON
    },
    ob:{
      type: Sequelize.JSON
    },
  });
  return Rent21_all;
};
