const Sequelize = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  Realestate_opp = require("../models/realestate.opp.model.js")(sequelize, Sequelize);
  const Realestate_client_item = sequelize.define("realestate_client_item", {
    uid: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex',
      primaryKey: true
    },
    price: {
      type: Sequelize.JSON // {in: integer, out:integer}
    },
    data: {
      type: Sequelize.INTEGER(15)
    },
    datap: {
      type: Sequelize.DATE
    },
    dostup: {
      type: Sequelize.JSON // [string]
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
    opp:{
      type: Sequelize.INTEGER,
      references: {
        // ссылка на другую модель
        model: Realestate_opp,
        // название колонки модели-ссылки с первичным ключом
        key: 'id',
      }
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
