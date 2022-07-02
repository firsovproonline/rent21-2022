module.exports = (sequelize, Sequelize) => {
  const Realestate_opp = sequelize.define("realestate_opp", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Realestate_opp;
};
