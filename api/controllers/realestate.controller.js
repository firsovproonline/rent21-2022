const db = require("../models");
const {verify} = require("jsonwebtoken");
const Realestate_opp = db.realestate_opp;
const Realestate_client_item = db.realestate_client_item;

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
            dostup: outOb[key].DOSTUP ? outOb[key].DOSTUP.split('|') : [],
            email : outOb[key].EMAIL,
            fio: outOb[key].FIO,
            gorod: outOb[key].GOROD,
            industry: outOb[key].INDUSTRY,
            metro: outOb[key].METRO ? outOb[key].METRO.split('|') : [],
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
            res.send(outOb)
          })
        },
        error => console.log("Ошибка: ", error.message)
      );
    });
  });
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
  const outOb = {};
  const promiseAR = [];
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
