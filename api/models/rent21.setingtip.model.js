module.exports = (sequelize, Sequelize) => {
  const Rent21_setingtip = sequelize.define("rent21_setingtip", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Rent21_setingtip;
};
