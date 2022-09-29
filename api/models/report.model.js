module.exports = (sequelize, Sequelize) => {
  const Rent21_report = sequelize.define("rent21_report", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    offerId:{
      type: Sequelize.INTEGER,
      unique: 'compositeIndex'
    },
    externalId: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
    },
    status: {
      type: Sequelize.STRING(16)
    },
    errors: {
      type: Sequelize.JSON
    },
    warnings: {
      type: Sequelize.JSON
    },
    url: {
      type: Sequelize.STRING(250)
    },
    name: {
      type: Sequelize.STRING(250)
    },
  });
  return Rent21_report;
};
