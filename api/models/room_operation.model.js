module.exports = (sequelize, Sequelize) => {
  const Room_operation = sequelize.define("room_operation", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Room_operation;
};
