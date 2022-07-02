module.exports = (sequelize, Sequelize) => {
  const Cian_PropertyType = sequelize.define("cian_PropertyType", {
    value: {
      type: Sequelize.STRING(32),
      unique: 'compositeIndex',
      primaryKey: true
    },
    caption: {
      type: Sequelize.STRING(64)
    },
  });
  return Cian_PropertyType;
};
