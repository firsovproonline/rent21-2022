module.exports = (sequelize, Sequelize) => {
  const Realestate_client_status = sequelize.define("realestate_client_status", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(64)
    }
  });
  return Realestate_client_status;
};
