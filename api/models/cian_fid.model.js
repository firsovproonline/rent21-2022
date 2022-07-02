module.exports = (sequelize, Sequelize) => {
  const propertyType = require("../models/cian_PropertyType.model.js")(sequelize, Sequelize);
  const Cian_fid = sequelize.define("cian_fid", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ExternalId: {
      type: Sequelize.STRING(64),
      unique: 'compositeIndex'
    },
    PropertyType: {
      type: Sequelize.STRING(16),
      references: {
        // ссылка на другую модель
        model: propertyType,
        // название колонки модели-ссылки с первичным ключом
        key: 'value',
      }

    },
    Description: {
      type: Sequelize.STRING
    },
    GuestsCount: {
      type: Sequelize.INTEGER
    },
    Address: {
      type: Sequelize.STRING
    },
    Coordinates: {
      type: Sequelize.GEOMETRY('POINT')
    },
    CadastralNumber: {
      type: Sequelize.STRING(32)
    },
    Phones: {
      type: Sequelize.JSON
      /*
        [
          {
            PhoneSchema: {
              CountryCode: 	Код страны (String)
              Number:	      Номер (String)
            }
          }
        ]
      */
    },
    Highway: {
      type: Sequelize.JSON
    },
    Highways: {
      type: Sequelize.JSON
    }

  });
  return Cian_fid;
};
