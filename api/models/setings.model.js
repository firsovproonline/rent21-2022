module.exports = (sequelize, Sequelize) => {
  const Setings = sequelize.define("setings", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ipphones: {
      type: Sequelize.JSON
    },
    cianexport: {
      type: Sequelize.JSON
    },
    avitoexport: {
      type: Sequelize.JSON
    },
    yandexexport: {
      type: Sequelize.JSON
    },
    yandexmap: {
      type: Sequelize.JSON
    },
    listsetings: {
      type: Sequelize.JSON
    }
  });
  return Setings;
};
