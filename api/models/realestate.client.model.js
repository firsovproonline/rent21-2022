module.exports = (sequelize, Sequelize) => {
  const Realestate_client_item = sequelize.define("realestate_client_item", {
    uid: {
      type: Sequelize.STRING(32),
      unique: 'compositeIndex',
      primaryKey: true
    },
    price: {
      type: Sequelize.JSON // {in: integer, out:integer}
    },
    data: {
      type: Sequelize.DATE
    },
    datap: {
      type: Sequelize.DATE
    },
    email: {
      type: Sequelize.STRING(32)
    },
    fio: {
      type: Sequelize.STRING(256)
    },
    gorod: {
      type: Sequelize.STRING(64)
    },
    industry: {
      type: Sequelize.STRING(32)
    },
    klemail: {
      type: Sequelize.JSON
      // [{value: string, tip:string}]
    },
    metro: {
      type: Sequelize.JSON
      // [string]
    },
    operation:{
      type: Sequelize.STRING(32)
    },
    square: {
      type: Sequelize.JSON // {in: integer, out:integer}
    },
    rajon: {
      type: Sequelize.JSON // [string]
    },
    region: {
      type: Sequelize.JSON // [string]
    },
    rem:{
      type: Sequelize.STRING
    },
    site: {
      type: Sequelize.JSON // [{value: string, tip:string}]
    },
    status:{
      type: Sequelize.STRING(16)
    },
    tel: {
      type: Sequelize.JSON // [{value: string, tip:string}]
    },
    tip: {
      type: Sequelize.STRING(16)
    },
    title: {
      type: Sequelize.STRING(16)
    }
  });
  return Realestate_client_item;
};
