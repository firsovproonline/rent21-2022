const db = require("../models");
const {verify} = require("jsonwebtoken");
const cianItems = require("../config/cian.config.js");
const {Op, fn} = require("sequelize");
const fs = require('fs')

const Realestate_opp = db.realestate_opp;
const Realestate_client_item = db.realestate_client_item;
const Realestate_client_status = db.realestate_client_status;
const Realestate_client_opp = db.realestate_client_opp;

exports.lids = (req, res) => {
  let page = 0
  const limit = 25
  if(req.body.page) page = req.body.page
  let offset =  page * limit
  // console.log(req.body.page)
  Realestate_client_item.findAll({
    attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('uid')), 'count']]
  }).then(items => {
    // console.log(items[0].dataValues.count)
    let total = items[0].dataValues.count
    Realestate_client_item.findAll({
      limit: limit,
      offset: offset
    }).then(items => {
      // console.log(items[0].dataValues.count)
      res.send({total: total, rows: items})
    });
  });
};

exports.oldlids = (req, res) => {
  // загружаем справочники
  const promiseSpr = []
  const clientSpr = {}
  promiseSpr.push(new Promise(function(resolve, reject) {
    Realestate_client_opp.findAll().then(items =>{
      clientSpr.opp = [];
      items.forEach(item =>{
        clientSpr.opp.push({id: item.dataValues.id, name:item.dataValues.name})
      })
      resolve()
    })
  }));
  promiseSpr.push(new Promise(function(resolve, reject) {
    Realestate_client_status.findAll().then(items =>{
      clientSpr.status = [];
      items.forEach(item =>{
        clientSpr.status.push({id: item.dataValues.id, name:item.dataValues.name})
      })
      resolve()
    })
  }));

  Promise.all(promiseSpr).then(
    result => {
      Realestate_client_item.destroy({
        truncate: true,
      }).then(item => {
        db.sequelize.query("SELECT lids.* FROM lids", {
        }).then(items => {
          const outOb = {}
          items[0].forEach(item => {
            if (!outOb[item.UID])
              outOb[item.UID] = {}
            outOb[item.UID][item.TITLE] = item.VAL
          })
          function verifyDate(data){
            try {
              return new Date(data).getDate()
            }catch (error) {
              console.log('********************************')
              return null;
            }
          }
          const promiseAR = [];

          for (let key in outOb) {
            promiseAR.push(new Promise(function(resolve, reject) {
              outOb[key].UID = key
              Realestate_client_item.create({
                uid: outOb[key].UID,
                price: outOb[key].CENA  ? {
                  in: (outOb[key].CENA.split('-')[0]) * 1,
                  out: (outOb[key].CENA.split('-')[1]) * 1
                } : {in: 0, out: 0},
                // data: (outOb[key].DATA && outOb[key].DATA !== ' ') ? new Date(outOb[key].DATA).getTime() : null,
                // datap: (outOb[key].DATAP && outOb[key].DATAP !== '') ? new Date(outOb[key].DATAP).getTime() : null,
                dostup: outOb[key].DOSTUP ? outOb[key].DOSTUP.split('|').map(item => item.trim()) : [],
                email : outOb[key].EMAIL,
                fio: outOb[key].FIO,
                gorod: outOb[key].GOROD,
                title: outOb[key].TITLE,
                industry: outOb[key].INDUSTRY,
                status:  outOb[key].STATUS && outOb[key].STATUS != '' ? clientSpr.status.find(item => item.name == outOb[key].STATUS).id : null,
                opp:  outOb[key].OPP ? clientSpr.opp.find(item => item.name == outOb[key].OPP).id : null,
                rajon: outOb[key].RAJON ? outOb[key].RAJON.split('|').map(item => item.trim()) : [],
                ulitca: outOb[key].ULITCA ? outOb[key].ULITCA.split('|').map(item => item.trim()) : [],
                metro: outOb[key].METRO ? outOb[key].METRO.split('|').map(item => item.trim()) : [],
                square: outOb[key].PL1 ? {
                  in: (outOb[key].PL1.split('-')[0]) * 1,
                  out: (outOb[key].PL1.split('-')[1]) * 1
                } : {in: 0, out: 0}
              }).then(item => {
                resolve(item)
              }).catch(error => {
                console.log(error)
                resolve(error)
              })
            }));
            // return outOb[key];
          };
          Promise.all(promiseAR).then(
            result => {
              Realestate_client_item.findAll().then(items =>{
                res.send(items)
              })
              console.log(clientSpr)
            },
            error => {
              Realestate_client_item.findAll().then(items =>{
                res.send(items)
              })
              console.log("Ошибка: ", error)
            }
          );
        });
      });

    },
    error => console.log("Ошибка: ", error.message)
  );
};

exports.oldAddress = (req, res) => {
  const outOb = {};
  db.sequelize.query("SELECT test_adRes21.* FROM test_adRes21 order by GOROD, ULITCA ", {
  }).then(items => {
    outOb.adres21 = items[0];
    db.sequelize.query("SELECT test_ob21.* FROM test_ob21", {
    }).then(items => {
      outOb.ob21 = items[0];
      db.sequelize.query("SELECT test_buid21.* FROM test_buid21", {
      }).then(items => {
        outOb.build21 = items[0];
        db.sequelize.query("SELECT test_linc21.* FROM test_linc21", {
        }).then(items => {
          outOb.linc21 = items[0];
          res.send(outOb)
        })
      })
    })
  })
};

exports.rent21uid = (req, res) => {
  res.status(200).send({});
};


exports.rent21address = (req, res) => {
  const Address = db.Rent21_address;
  const Linc = db.Rent21_linc;
  const House = db.Rent21_building;
  const { Op, fn } = require('sequelize')
  Address.findAll({
    where : {
      "fields.GOROD":{
        [Op.substring]:  req.body.locality
      },
      "fields.ULITCA":{
        [Op.substring]:  req.body.street
      },
      "fields.DOM":{
        [Op.substring]:  req.body.house
      },

    }
  }).then(items=>{
    const promiseAR = [];
    items.forEach(item =>{
      promiseAR.push(new Promise(function(resolve, reject) {
        Linc.findAll({
          attributes: [
            'val',
            'puid',
            [fn('CONCAT',JSON.stringify(Object(item.dataValues))),'address']
          ],
          where: {
            puid: {
              [Op.in]:[item.dataValues.uid]
            }
          }
        }).then(itemsLinc =>{
          resolve(itemsLinc)
        }).catch(error => {
          reject(error)
        })
      }));
    })
    Promise.all(promiseAR).then(
      result => {
        const promiseAR = [];
        result.forEach(resultLinc =>{
          // console.log('=========resultLinc========', resultLinc[0]);
          // получаем здания по адресам
          const uids = [];
          let address = null;
          resultLinc.forEach(item=>{
            uids.push(item.dataValues.val);
            address = item.dataValues.address;
          })
          promiseAR.push(new Promise(function(resolve, reject) {
            House.findAll({
              attributes: [
                'uid',
                'fields',
                [fn('CONCAT',address),'address']
              ],
              where: {
                uid: {
                  [Op.in]:uids
                }
              }
            }).then(itemsHouse =>{
              const address = JSON.parse(itemsHouse[0].dataValues.address);
              itemsHouse.forEach(item=>{
                delete (item.dataValues.address);
              });
              address.build = itemsHouse;
              resolve(address)
            }).catch(error => {
              reject(error)
            })
          }));

        })
        Promise.all(promiseAR).then(
          result => {
//            result.forEach(item=>{
//              console.log(item)
//            })
            res.status(200).send(result);
          },
          error => {
            res.status(200).send(items);
            console.log("Ошибка: ", error)
          }
        );
      },
      error => {
        res.status(200).send(items);
        console.log("Ошибка: ", error)
      }
    );
  })
}

exports.room = (req, res) => {
  const Address = db.Rent21_all;
  const build = db.Rent21_all;
  const Ob = db.Rent21_all;
  const nextDb = db;
  const { Op, fn } = require('sequelize')
  const fileContent = fs.readFileSync(__dirname +'/dynamic/returnRoom.js', "utf8");
  eval(fileContent);
};

exports.address = (req, res) => {
  const Address = db.Rent21_all;
  const build = db.Rent21_all;
  const Ob = db.Rent21_all;
  const nextDb = db;
  const { Op, fn } = require('sequelize')
  const fileContent = fs.readFileSync(__dirname +'/dynamic/returnBuilds.js', "utf8");
  eval(fileContent);
};

exports.house = (req, res) => {
  const Address = db.address;
  const House = db.house;
  console.log(req);
  Address.findAll().then(items => {
    res.status(200).send(items);
  })
};

exports.spr = (req, res) => {
  const House_tip = db.house_tip;
  const Room_tip = db.room_tip;
  const Room_operation = db.room_operation;
  const Realestate_client_status = db.realestate_client_status;
  const Realestate_client_opp = db.realestate_client_opp;
  const outOb = {};
  outOb.cianItems = cianItems;
  outOb.rentCommercial = [
    {id: 'garageRent', name: 'Гараж'},
    {id: 'buildingRent', name: 'Здание'},
    {id: 'commercialLandRent', name: 'Коммерческая земля'},
    {id: 'officeRent', name: 'Офис'},
    {id: 'freeAppointmentObjectRent', name: 'Помещение свободного назначения'},
    {id: 'industryRent', name: 'Производство'},
    {id: 'warehouseRent', name: 'Склад'},
    {id: 'shoppingAreaRent', name: 'Торговая площадь'}
  ];
  outOb.category = [
    {id: 'flatRent', name: 'Квартира'},
    {id: 'bedRent', name: 'Койко-место'},
    {id: 'roomRent', name: 'Комната'},
    {id: 'houseRent', name: 'Дом/дача'},
    {id: 'cottageRent', name: 'Коттедж'},
    {id: 'townhouseRent', name: 'Таунхаус'},
    {id: 'houseShareRent', name: 'Часть дома'},
    {id: 'garageRent', name: 'Гараж'},
    {id: 'buildingRent', name: 'Здание'},
    {id: 'commercialLandRent', name: 'Коммерческая земля'},
    {id: 'officeRent', name: 'Офис'},
    {id: 'freeAppointmentObjectRent', name: 'Помещение свободного назначения'},
    {id: 'industryRent', name: 'Производство'},
    {id: 'warehouseRent', name: 'Склад'},
    {id: 'shoppingAreaRent', name: 'Торговая площадь'},

  ];
  outOb.opp = [
    {id: 'Аренда', name: 'Аренда'},
    {id: 'Продажа', name: 'Продажа'},
  ]

  outOb.clientStatus = [
    {id: 'Новый', name: 'Новый'},
    {id: 'В работе (Выяснение потребностей)', name: 'В работе (Выяснение потребностей)'},
    {id: 'В работе (Коммерческие предложения)', name: 'В работе (Коммерческие предложения)'},
    {id: 'В работе (Показ объектов)', name: 'В работе (Показ объектов)'},
    {id: 'В работе (Переговоры)', name: 'В работе (Переговоры)'},
    {id: 'В работе (Принятие решение)', name: 'В работе (Принятие решение)'},
    {id: 'Снял у нас', name: 'Снял у нас'},
    {id: 'Снял сам', name: 'Снял сам'},
    {id: 'Отложенный спрос', name: 'Отложенный спрос'},
    {id: 'Остается у себя', name: 'Остается у себя'},
    {id: 'Резиновый', name: 'Резиновый'}
  ];
  outOb.clientOpp = [
    {id: 'Сниму', name: 'Сниму'},
    {id: 'Куплю', name: 'Куплю'},
  ]

  outOb.propertytype = [
    {id: 'Коммерческая', name: 'Коммерческая'},
    {id: 'Жилая', name: 'Жилая'},
    {id: 'Загородная', name: 'Загородная'},
  ]

  outOb.clientTip = [
    {id: 'Квартира', name: 'Квартира'},
    {id: 'Койко-место', name: 'Койко-место'},
    {id: 'Комната', name: 'Комната'},
    {id: 'Дом/дача', name: 'Дом/дача'},
    {id: 'Коттедж', name: 'Коттедж'},
    {id: 'Таунхаус', name: 'Таунхаус'},
    {id: 'Часть дома', name: 'Часть дома'},
    {id: 'Гараж', name: 'Гараж'},
    {id: 'Здание', name: 'Здание'},
    {id: 'Коммерческая земля', name: 'Коммерческая земля'},
    {id: 'Офис', name: 'Офис'},
    {id: 'Помещение свободного назначения', name: 'Помещение свободного назначения'},
    {id: 'Производство', name: 'Производство'},
    {id: 'Склад', name: 'Склад'},
    {id: 'Торговая площадь', name: 'Торговая площадь'},
  ]
  outOb.clientTipPhone = [
    {id: 'Мобильный', name: 'Мобильный'},
    {id: 'Домашний', name: 'Домашний'},
    {id: 'Рабочий', name: 'Рабочий'},
  ]
  outOb.clientRajon = [
    {id: 'Центральный', name: 'Центральный',ch: false},
    {id: 'Северный', name: 'Северный',ch: false},
    {id: 'Северо-Восточный', name: 'Северо-Восточный',ch: false},
    {id: 'Восточный', name: 'Восточный',ch: false},
    {id: 'Юго-Восточный', name: 'Юго-Восточный',ch: false},
    {id: 'Южный', name: 'Южный',ch: false},
    {id: 'Юго-Западный', name: 'Юго-Западный',ch: false},
    {id: 'Западный', name: 'Западный',ch: false},
    {id: 'Северо-Западный', name: 'Северо-Западный',ch: false},
    {id: 'Зеленоградский', name: 'Зеленоградский',ch: false}
  ]
  outOb.clientOkrug = [
    {id: 'Академический', name: 'Академический',ch: false},
    {id: 'Алексеевский', name: 'Алексеевский',ch: false},
    {id: 'Алтуфьевский', name: 'Алтуфьевский',ch: false},
    {id: 'Арбат', name: 'Арбат',ch: false},
    {id: 'Аэропорт', name: 'Аэропорт',ch: false},
    {id: 'Бабушкинский', name: 'Бабушкинский',ch: false},
    {id: 'Басманный', name: 'Басманный',ch: false},
    {id: 'Беговой', name: 'Беговой',ch: false},
    {id: 'Бескудниковский', name: 'Бескудниковский',ch: false},
    {id: 'Бибирево', name: 'Бибирево',ch: false},
    {id: 'Бирюлёво Восточное', name: 'Бирюлёво Восточное',ch: false},
    {id: 'Бирюлёво Западное', name: 'Бирюлёво Западное',ch: false},
    {id: 'Богородское', name: 'Богородское',ch: false},
    {id: 'Братеево', name: 'Братеево',ch: false},
    {id: 'Бутово Северное', name: 'Бутово Северное',ch: false},
    {id: 'Бутово Южное', name: 'Бутово Южное',ch: false},
    {id: 'Бутырский', name: 'Бутырский',ch: false},
    {id: 'Вешняки', name: 'Вешняки',ch: false},
    {id: 'Внуково', name: 'Внуково',ch: false},
    {id: 'Войковский', name: 'Войковский',ch: false},
    {id: 'Восточный', name: 'Восточный',ch: false},
    {id: 'Выхино-Жулебино', name: 'Выхино-Жулебино',ch: false},
    {id: 'Гагаринский', name: 'Гагаринский',ch: false},
    {id: 'Головинский', name: 'Головинский',ch: false},
    {id: 'Гольяново', name: 'Гольяново',ch: false},
    {id: 'Даниловский', name: 'Даниловский',ch: false},
    {id: 'Дегунино Восточное', name: 'Дегунино Восточное',ch: false},
    {id: 'Дегунино Западное', name: 'Дегунино Западное',ch: false},
    {id: 'Дмитровский', name: 'Дмитровский',ch: false},
    {id: 'Донской', name: 'Донской',ch: false},
    {id: 'Дорогомилово', name: 'Дорогомилово',ch: false},
    {id: 'Замоскворечье', name: 'Замоскворечье',ch: false},
    {id: 'Зюзино', name: 'Зюзино',ch: false},
    {id: 'Зябликово', name: 'Зябликово',ch: false},
    {id: 'Ивановское', name: 'Ивановское',ch: false},
    {id: 'Измайлово', name: 'Измайлово',ch: false},
    {id: 'Измайлово Северное', name: 'Измайлово Северное',ch: false},
    {id: 'Капотня', name: 'Капотня',ch: false},
    {id: 'Коньково', name: 'Коньково',ch: false},
    {id: 'Коптево', name: 'Коптево',ch: false},
    {id: 'Косино-Ухтомский', name: 'Косино-Ухтомский',ch: false},
    {id: 'Котловка', name: 'Котловка',ch: false},
    {id: 'Красносельский', name: 'Красносельский',ch: false},
    {id: 'Крылатское', name: 'Крылатское',ch: false},
    {id: 'Крюково', name: 'Крюково',ch: false},
    {id: 'Кузьминки', name: 'Кузьминки',ch: false},
    {id: 'Кунцево', name: 'Кунцево',ch: false},
    {id: 'Куркино', name: 'Куркино',ch: false},
    {id: 'Левобережный', name: 'Левобережный',ch: false},
    {id: 'Лефортово', name: 'Лефортово',ch: false},
    {id: 'Лианозово', name: 'Лианозово',ch: false},
    {id: 'Ломоносовский', name: 'Ломоносовский',ch: false},
    {id: 'Лосиноостровский', name: 'Лосиноостровский',ch: false},
    {id: 'Люблино', name: 'Люблино',ch: false},
    {id: 'Марфино', name: 'Марфино',ch: false},
    {id: 'Марьина роща', name: 'Марьина роща',ch: false},
    {id: 'Марьино', name: 'Марьино',ch: false},
    {id: 'Матушкино', name: 'Матушкино',ch: false},
    {id: 'Медведково Северное', name: 'Медведково Северное',ch: false},
    {id: 'Медведково Южное', name: 'Медведково Южное',ch: false},
    {id: 'Метрогородок', name: 'Метрогородок',ch: false},
    {id: 'Мещанский', name: 'Мещанский',ch: false},
    {id: 'Митино', name: 'Митино',ch: false},
    {id: 'Можайский', name: 'Можайский',ch: false},
    {id: 'Молжаниновский', name: 'Молжаниновский',ch: false},
    {id: 'Москворечье-Сабурово', name: 'Москворечье-Сабурово',ch: false},
    {id: 'Нагатино-Садовники', name: 'Нагатино-Садовники',ch: false},
    {id: 'Нагатинский затон', name: 'Нагатинский затон',ch: false},
    {id: 'Нагорный', name: 'Нагорный',ch: false},
    {id: 'Некрасовка', name: 'Некрасовка',ch: false},
    {id: 'Нижегородский', name: 'Нижегородский',ch: false},
    {id: 'Ново-Переделкино', name: 'Ново-Переделкино',ch: false},
    {id: 'Новогиреево', name: 'Новогиреево',ch: false},
    {id: 'Новокосино', name: 'Новокосино',ch: false},
    {id: 'Обручевский', name: 'Обручевский',ch: false},
    {id: 'Орехово-Борисово Северное', name: 'Орехово-Борисово Северное',ch: false},
    {id: 'Орехово-Борисово Южное', name: 'Орехово-Борисово Южное',ch: false},
    {id: 'Останкинский', name: 'Останкинский',ch: false},
    {id: 'Отрадное', name: 'Отрадное',ch: false},
    {id: 'Очаково-Матвеевское', name: 'Очаково-Матвеевское',ch: false},
    {id: 'Перово', name: 'Перово',ch: false},
    {id: 'Печатники', name: 'Печатники',ch: false},
    {id: 'Покровское-Стрешнево', name: 'Покровское-Стрешнево',ch: false},
    {id: 'Преображенское', name: 'Преображенское',ch: false},
    {id: 'Пресненский', name: 'Пресненский',ch: false},
    {id: 'Проспект Вернадского', name: 'Проспект Вернадского',ch: false},
    {id: 'Раменки', name: 'Раменки',ch: false},
    {id: 'Ростокино', name: 'Ростокино',ch: false},
    {id: 'Рязанский', name: 'Рязанский',ch: false},
    {id: 'Савёлки', name: 'Савёлки',ch: false},
    {id: 'Савёловский', name: 'Савёловский',ch: false},
    {id: 'Свиблово', name: 'Свиблово',ch: false},
    {id: 'Северный', name: 'Северный',ch: false},
    {id: 'Силино', name: 'Силино',ch: false},
    {id: 'Сокол', name: 'Сокол',ch: false},
    {id: 'Соколиная гора', name: 'Соколиная гора',ch: false},
    {id: 'Сокольники', name: 'Сокольники',ch: false},
    {id: 'Солнцево', name: 'Солнцево',ch: false},
    {id: 'Старое Крюково', name: 'Старое Крюково',ch: false},
    {id: 'Строгино', name: 'Строгино',ch: false},
    {id: 'Таганский', name: 'Таганский',ch: false},
    {id: 'Тверской', name: 'Тверской',ch: false},
    {id: 'Текстильщики', name: 'Текстильщики',ch: false},
    {id: 'Тёплый Стан', name: 'Тёплый Стан',ch: false},
    {id: 'Тимирязевский', name: 'Тимирязевский',ch: false},
    {id: 'Тропарёво-Никулино', name: 'Тропарёво-Никулино',ch: false},
    {id: 'Тушино Северное', name: 'Тушино Северное',ch: false},
    {id: 'Тушино Южное', name: 'Тушино Южное',ch: false},
    {id: 'Филёвский парк', name: 'Филёвский парк',ch: false},
    {id: 'Фили-Давыдково', name: 'Фили-Давыдково',ch: false},
    {id: 'Хамовники', name: 'Хамовники',ch: false},
    {id: 'Ховрино', name: 'Ховрино',ch: false},
    {id: 'Хорошёво-Мневники', name: 'Хорошёво-Мневники',ch: false},
    {id: 'Хорошёвский', name: 'Хорошёвский',ch: false},
    {id: 'Царицыно', name: 'Царицыно',ch: false},
    {id: 'Черёмушки', name: 'Черёмушки',ch: false},
    {id: 'Чертаново Северное', name: 'Чертаново Северное',ch: false},
    {id: 'Чертаново Центральное', name: 'Чертаново Центральное',ch: false},
    {id: 'Чертаново Южное', name: 'Чертаново Южное',ch: false},
    {id: 'Щукино', name: 'Щукино',ch: false},
    {id: 'Южнопортовый', name: 'Южнопортовый',ch: false},
    {id: 'Якиманка', name: 'Якиманка',ch: false},
    {id: 'Ярославский', name: 'Ярославский',ch: false},
    {id: 'Ясенево', name: 'Ясенево',ch: false}
  ]

  const promiseAR = [];


  promiseAR.push(new Promise(function(resolve, reject) {
    Realestate_client_opp.findAll().then(items => {
      outOb.Realestate_client_opp = items;
      resolve();
    })
  }));

  promiseAR.push(new Promise(function(resolve, reject) {
    Realestate_client_status.findAll().then(items => {
      outOb.Realestate_client_status = items;
      resolve();
    })
  }));

  promiseAR.push(new Promise(function(resolve, reject) {
    House_tip.findAll().then(items => {
      outOb.house_tip = items;
      resolve();
    })
  }));
  promiseAR.push(new Promise(function(resolve, reject) {
    Room_tip.findAll().then(items => {
      outOb.room_tip = items;
      resolve();
    })
  }));
  promiseAR.push(new Promise(function(resolve, reject) {
    Room_operation.findAll().then(items => {
      outOb.room_operation = items;
      resolve();
    })
  }));
  Promise.all(promiseAR).then(
    result => {
      res.status(200).send(outOb);
    },
    error => console.log("Ошибка: ", error.message)
  );

};
