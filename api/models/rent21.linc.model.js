module.exports = (sequelize, Sequelize) => {
  const Rent21_linc = sequelize.define("rent21_linc", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    puid: {
      type: Sequelize.STRING(64),
    },
    val: {
      type: Sequelize.STRING(64),
    }
  });
  return Rent21_linc;
};
