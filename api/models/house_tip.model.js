module.exports = (sequelize, Sequelize) => {
  const Hose_tip = sequelize.define("house_tip", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Hose_tip;
};
