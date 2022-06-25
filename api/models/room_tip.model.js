module.exports = (sequelize, Sequelize) => {
  const Room_tip = sequelize.define("room_tip", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Room_tip;
};
