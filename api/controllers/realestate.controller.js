const db = require("../models");

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
