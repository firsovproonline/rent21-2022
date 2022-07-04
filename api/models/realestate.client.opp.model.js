module.exports = (sequelize, Sequelize) => {
  const Realestate_client_opp = sequelize.define("realestate_client_opp", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(64)
    }
  });
  return Realestate_client_opp;
};
