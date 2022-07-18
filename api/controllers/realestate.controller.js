const db = require("../models");
const {verify} = require("jsonwebtoken");
const cianItems = require("../config/cian.config.js");
const {Op} = require("sequelize");

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

exports.rent21address = (req, res) => {
  const Address = db.Rent21_address;
  const { Op } = require('sequelize')
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
    res.status(200).send(items);
  })
}


exports.address = (req, res) => {
  const Address = db.address;
  const House = db.house;
  const Room = db.room;
  Address.findAll().then(items => {
    const promiseAR = [];
    items.forEach(itemAddress => {
      promiseAR.push(new Promise(function(resolve, reject) {
        House.findAll({
          where: {
            addressUid: itemAddress.uid,
          },
        }).then(houses => {
          if(houses.length > 0){
            let itemHouse = items.find(item => item.uid === houses[0].addressUid);
            itemHouse.dataValues.houses = houses;
            itemHouse.dataValues.roomsCount = 0;
            const promiseARHouse = [];
            houses.forEach(house => {
              promiseARHouse.push(new Promise(function(resolve, reject) {
                Room.findAll({
                  where: {
                    houseUid: house.uid,
                  },
                }).then(rooms =>{
                  if(rooms.length > 0){
                    itemHouse.dataValues.houses.find(item => item.uid === rooms[0].houseUid).dataValues.rooms = rooms;
                    itemHouse.dataValues.roomsCount = itemHouse.dataValues.roomsCount + rooms.length;
                    resolve()
                  }else
                    resolve()
                });
              }));
            })
            Promise.all(promiseARHouse).then(
              result => {
                resolve()
              },
              error => console.log("Ошибка: ", error.message)
            );
          } else
            resolve()
        })
      }));

    })
    Promise.all(promiseAR).then(
      result => {
        res.status(200).send(items);
      },
      error => console.log("Ошибка: ", error.message)
    );
  })
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
