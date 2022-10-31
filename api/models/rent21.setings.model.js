module.exports = (sequelize, Sequelize) => {
  const Rent21_setings = sequelize.define("rent21_setings", {
    name: {
      type: Sequelize.STRING(64)
    },
    type: {
      type: Sequelize.STRING(32)
    },
    uid: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
    },
    fields: {
      type:Sequelize.JSON
    },
    photo: {
      type:Sequelize.BLOB('medium')
    },
  });
  return Rent21_setings;
};
