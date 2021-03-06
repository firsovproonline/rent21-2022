module.exports = (sequelize, Sequelize) => {
  const Rent21_address = sequelize.define("rent21_address", {
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
  });
  return Rent21_address;
};
