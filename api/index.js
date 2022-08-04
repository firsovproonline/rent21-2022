import ss from "sequelize";

const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require("./models");

const Realestate_opp = db.realestate_opp;
const Realestate_client_opp = db.realestate_client_opp;
const Realestate_client_item = db.realestate_client_item;
const Realestate_client_status = db.realestate_client_status;

const Rent21_address = db.Rent21_address;
const Rent21_building = db.Rent21_building;
const Rent21_linc = db.Rent21_linc;
const Rent21_ob = db.Rent21_ob;
const Rent21_all = db.Rent21_all;
const Rent21_lids = db.Rent21_lids;


const Role = db.role;
const Adress = db.address;
const House = db.house;
const Room = db.room;
const Seting = db.Setings;

const House_tip = db.house_tip;
const Room_tip = db.room_tip;
const Room_operation = db.room_operation;
const Shop_catalog = db.shop_catalog;
const User = db.user;
const Cian_PropertyType = db.cian_PropertyType
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUID() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
function importLids(){
  db.sequelize.query("SELECT DISTINCT UID FROM lids", {}).then(items=>{
    items[0].forEach(item=>{
      db.sequelize.query("SELECT * FROM lids WHERE UID ='"+item.UID+"'", {}).then(items=>{
        let i = items[0].length;
        let outOB = {};
        items[0].forEach(item=>{
          if(i === items[0].length){
            outOB = {};
          }
          i--;
          outOB[item.TITLE] = item.VAL;
          if(i===0){
            Rent21_lids.create({
              uid: item.UID,
              fields: outOB
            });
          }
        })
      });
    })
  })
}

function generateBuilders(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['buid21']
      }
    }
  }).then(items=>{
    const promiseAR1 = [];
    items.forEach(item=>{
      promiseAR1.push(new Promise(function(resolve1, reject1) {
        const uid = item.getDataValue('uid');
        Rent21_linc.findAll({
          attributes:[
            'puid',
            'val',
            [ss.fn('CONCAT',uid),'mainuid']
          ],
          where:{
            puid: {
              [ss.Op.in]:[uid]
            }
          }
        }).then(itemsLink=>{
          const promiseAR2 = [];
          if(itemsLink.length && itemsLink.length > 0){
            itemsLink.forEach(itemLink => {
              promiseAR2.push(new Promise(function(resolve2, reject2) {
                Rent21_all.findAll({
                  attributes:[
                    'fields',
                    'uid',
                    'tip',
                    [ss.fn('CONCAT',itemLink.dataValues.mainuid),'mainuid']
                  ],
                  where:{
                    uid: {
                      [ss.Op.in]:[itemLink.dataValues.val]
                    }
                  }
                }).then(items=>{
                  if(items.length && items.length > 0){
                    const outOB = {}
                    let i = items.length;
                    items.forEach(item=>{
                      let key = 'ob'
                      if(item.dataValues.tip === 'soBst21'){
                        key = 'owners'
                      }
                      if(!outOB[key]){
                        outOB[key] = [];
                      }
                      i--
                      outOB[key].push(item.getDataValue('fields'));
                      if(i===0){
                        Rent21_all.update(outOB,{
                            where:{
                              uid: {
                                [ss.Op.in]:[item.getDataValue('mainuid')]
                              }
                            },
                          }
                        ).then(item=>{
                          resolve2();
                        })
                      }
                    })
                  }else{
                    resolve2()
                  }
                })
              }));
            })
          }else{
            resolve1()
          }
          Promise.all(promiseAR2).then(
            result => {
              resolve1();
            }
          )
        })
      }));
    })
    Promise.all(promiseAR1).then(
      result => {
        console.log('+++++++builders+++++++++++');
      }
    );

  })

}

function generateAddrees(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['adRes21']
      }
    }
  }).then(items=>{
    const promiseAR1 = [];
    items.forEach(item=>{
      promiseAR1.push(new Promise(function(resolve1, reject1) {
        const uid = item.getDataValue('uid');
        Rent21_linc.findAll({
          attributes:[
            'puid',
            'val',
            [ss.fn('CONCAT',uid),'mainuid']
          ],
          where:{
            puid: {
              [ss.Op.in]:[uid]
            }
          }
        }).then(itemsLink=>{
          const promiseAR2 = [];
          if(itemsLink.length && itemsLink.length > 0){
            itemsLink.forEach(itemLink => {
              promiseAR2.push(new Promise(function(resolve2, reject2) {
                Rent21_all.findAll({
                  attributes:[
                    'fields',
                    'uid',
                    'tip',
                    [ss.fn('CONCAT',itemLink.dataValues.mainuid),'mainuid']
                  ],
                  where:{
                    uid: {
                      [ss.Op.in]:[itemLink.dataValues.val]
                    }
                  }
                }).then(items=>{
                  if(items.length && items.length > 0){
                    const outOB = {building:[]}
                    let i = items.length;
                    items.forEach(item=>{
                      i--
                      outOB.building.push(item.getDataValue('fields'))
                      if(i===0){
                        const mainuid = item.getDataValue('mainuid')
                        if(outOB.building.length > 1)
                          console.log(outOB.building.length)
                        Rent21_all.update(outOB,{
                            where:{
                              uid: {
                                [ss.Op.in]:[item.getDataValue('mainuid')]
                              }
                            },
                          }
                        ).then(item=>{
                          resolve2();
                        })
                      }
                    })
                  }else{
                    resolve2()
                  }
                })
              }));
            })
          }else{
            resolve1()
          }
          Promise.all(promiseAR2).then(
            result => {
              resolve1();
            }
          )
        })
      }));
    })
    Promise.all(promiseAR1).then(
      result => {
        console.log('++++++++++++++++++++++++++++');
        generateBuilders();
      }
    );

  })

}

function generateOwners(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['soBst21']
      }
    }
  }).then(items=>{
      const promiseAR1 = [];
      items.forEach(item=>{
        promiseAR1.push(new Promise(function(resolve1, reject1) {
          const uid = item.getDataValue('uid');
          Rent21_linc.findAll({
            attributes:[
              'puid',
              'val',
              [ss.fn('CONCAT',uid),'mainuid']
            ],
            where:{
              puid: {
                [ss.Op.in]:[uid]
              }
            }
          }).then(itemsLink=>{
            const promiseAR2 = [];
            if(itemsLink.length && itemsLink.length > 0){
              itemsLink.forEach(itemLink => {
                promiseAR2.push(new Promise(function(resolve2, reject2) {
                  Rent21_all.findAll({
                    attributes:[
                      'fields',
                      'uid',
                      'tip',
                      [ss.fn('CONCAT',itemLink.dataValues.mainuid),'mainuid']
                    ],
                    where:{
                      uid: {
                        [ss.Op.in]:[itemLink.dataValues.val]
                      }
                    }
                  }).then(items=>{
                    if(items.length && items.length > 0){
                      const outOB = {contact:[]}
                      let i = items.length;
                      items.forEach(item=>{
                        i--
                        outOB.contact.push(item.getDataValue('fields'))
                        if(i===0){
                          const mainuid = item.getDataValue('mainuid')
                          if(outOB.contact.length > 1)
                            console.log(outOB.contact.length)
                          Rent21_all.update(outOB,{
                              where:{
                                uid: {
                                  [ss.Op.in]:[item.getDataValue('mainuid')]
                                }
                              },
                            }
                          ).then(item=>{
                            resolve2();
                          })
                        }
                      })
                    }else{
                      resolve2()
                    }
                  })
                }));
              })
            }else{
              resolve1()
            }
            Promise.all(promiseAR2).then(
              result => {
                resolve1();
              }
            )
          })
        }));
      })
      Promise.all(promiseAR1).then(
        result => {
          console.log('++++++++++++++++++++++++++++');
          generateAddrees();
        }
      );

  })

}

function generateAddress(){

}
function updatebuid21(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['buid21']
      }
    }
  }).then(koNt21items => {
    const promiseAR1 = [];
    koNt21items.forEach(koNt21item=>{
      promiseAR1.push(new Promise(function(resolve1, reject1) {
        const koNt21 = JSON.stringify(Object( koNt21item.getDataValue('fields')));
        Rent21_linc.findAll({
          attributes:[
            'puid',
            'val',
            [ss.fn('CONCAT',koNt21),'koNt21']
          ],
          where:{
            puid: {
              [ss.Op.in]:[koNt21item.dataValues.uid]
            }
          }
        }).then(itemsLink =>{
          if(itemsLink.length>0){
            console.log(itemsLink.length)
            const promiseAR2 = [];
            itemsLink.forEach(itemLink =>{
              promiseAR2.push(new Promise(function(resolve2, reject2) {
                Rent21_all.findAll({
                  attributes:[
                    'contact',
                    'uid',
                    'tip',
                    [ss.fn('CONCAT',itemLink.dataValues.koNt21),'koNt21']
                  ],
                  where:{
                    uid: {
                      [ss.Op.in]:[itemLink.dataValues.val]
                    }
                  }
                }).then(items=>{
                  if(items.forEach){
                    const promiseAR3 = [];
                    const outOb = {};

                    items.forEach(item=>{
                      let key = 'ob21'
                      if(item.dataValues.tip === 'soBst21'){
                        key = 'owners'
                      }
                      if(!outOb[key]){
                        outOb[key] = [];
                      }
                      outOb[key].push(item.dataValues);
                      promiseAR3.push(new Promise(function(resolve3, reject3) {
                        if(!item.getDataValue('contact')){
                          item.contact = [];
                        }
                        item.contact.push(JSON.parse(item.dataValues.koNt21))
                        Rent21_all.update({
                            building: item.contact
                          },{
                            where:{
                              uid: {
                                [ss.Op.in]:[item.uid]
                              }
                            },
                          }
                        ).then(item=>{
                          resolve3();
                        })
                      }));
                    })
                    Promise.all(promiseAR3).then(
                      result => {
                        resolve2();
                      }
                    );
                  }
                  else{
                    resolve2()
                  }
                })
              }));
            })
            Promise.all(promiseAR2).then(
              result => {
                resolve1();
              }
            )
          }
          else{
            resolve1()
          }
        })
      }));
    })
    Promise.all(promiseAR1).then(
      result => {
        console.log('end buid21');
      }
    );
  })

}

function updateob(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['ob21']
      }
    }
  }).then(koNt21items => {
    const promiseAR1 = [];
    koNt21items.forEach(koNt21item=>{
      promiseAR1.push(new Promise(function(resolve1, reject1) {
        const koNt21 = JSON.stringify(Object( koNt21item.getDataValue('fields')));
        Rent21_linc.findAll({
          attributes:[
            'puid',
            'val',
            [ss.fn('CONCAT',koNt21),'koNt21']
          ],
          where:{
            val: {
              [ss.Op.in]:[koNt21item.dataValues.uid]
            }
          }
        }).then(itemsLink =>{
          if(itemsLink.length>0){
            const promiseAR2 = [];
            itemsLink.forEach(itemLink =>{
              promiseAR2.push(new Promise(function(resolve2, reject2) {
                Rent21_all.findAll({
                  attributes:[
                    'contact',
                    'uid',
                    'tip',
                    [ss.fn('CONCAT',itemLink.dataValues.koNt21),'koNt21']
                  ],
                  where:{
                    uid: {
                      [ss.Op.in]:[itemLink.dataValues.puid]
                    }
                  }
                }).then(items=>{
                  if(items.forEach){
                    const promiseAR3 = [];
                    items.forEach(item=>{
                      promiseAR3.push(new Promise(function(resolve3, reject3) {
                        if(!item.getDataValue('contact')){
                          item.contact = [];
                        }
                        item.contact.push(JSON.parse(item.dataValues.koNt21))
                        Rent21_all.update({
                            ob: item.contact
                          },{
                            where:{
                              uid: {
                                [ss.Op.in]:[item.uid]
                              }
                            },
                          }
                        ).then(item=>{
                          resolve3();
                        })
                      }));
                    })
                    Promise.all(promiseAR3).then(
                      result => {
                        resolve2();
                      }
                    );
                  }
                  else{
                    resolve2()
                  }
                })
              }));
            })
            Promise.all(promiseAR2).then(
              result => {
                resolve1();
              }
            )
          }
          else{
            resolve1()
          }
        })
      }));
    })
    Promise.all(promiseAR1).then(
      result => {
        console.log('end ob');
        updatebuid21();
      }
    );
  })

}

function updateowners(){
  Rent21_all.findAll({
    where:{
      tip: {
        [ss.Op.in]:['soBst21']
      }
    }
  }).then(koNt21items => {
    const promiseAR1 = [];
    koNt21items.forEach(koNt21item=>{
      promiseAR1.push(new Promise(function(resolve1, reject1) {
        const koNt21 = JSON.stringify(Object( koNt21item.getDataValue('fields')));
        Rent21_linc.findAll({
          attributes:[
            'puid',
            'val',
            [ss.fn('CONCAT',koNt21),'koNt21']
          ],
          where:{
            val: {
              [ss.Op.in]:[koNt21item.dataValues.uid]
            }
          }
        }).then(itemsLink =>{
          if(itemsLink.length>0){
            const promiseAR2 = [];
            itemsLink.forEach(itemLink =>{
              promiseAR2.push(new Promise(function(resolve2, reject2) {
                Rent21_all.findAll({
                  attributes:[
                    'contact',
                    'uid',
                    'tip',
                    [ss.fn('CONCAT',itemLink.dataValues.koNt21),'koNt21']
                  ],
                  where:{
                    uid: {
                      [ss.Op.in]:[itemLink.dataValues.puid]
                    }
                  }
                }).then(items=>{
                  if(items.forEach){
                    const promiseAR3 = [];
                    items.forEach(item=>{
                      promiseAR3.push(new Promise(function(resolve3, reject3) {
                        if(!item.getDataValue('contact')){
                          item.contact = [];
                        }
                        item.contact.push(JSON.parse(item.dataValues.koNt21))
                        Rent21_all.update({
                            owners: item.contact
                          },{
                            where:{
                              uid: {
                                [ss.Op.in]:[item.uid]
                              }
                            },
                          }
                        ).then(item=>{
                          resolve3();
                        })
                      }));
                    })
                    Promise.all(promiseAR3).then(
                      result => {
                        resolve2();
                      }
                    );
                  }
                  else{
                    resolve2()
                  }
                })
              }));
            })
            Promise.all(promiseAR2).then(
              result => {
                resolve1();
              }
            )
          }
          else{
            resolve1()
          }
        })
      }));
    })
    Promise.all(promiseAR1).then(
      result => {
        console.log('end owners');
        updateob();
      }
    );
  })

}

function initial() {
  importLids();
  Realestate_client_opp.create({
    id: 0,
    name: 'Сниму'
  })
  Realestate_client_opp.create({
    id: 1,
    name: 'Куплю'
  })

  Realestate_client_status.create({
    id: 0,
    name: 'Новый'
  })
  Realestate_client_status.create({
    id: 1,
    name: 'В работе (Выяснение потребностей)'
  })
  Realestate_client_status.create({
    id: 2,
    name: 'В работе (Коммерческие предложения)'
  })
  Realestate_client_status.create({
    id: 3,
    name: 'В работе (Показ объектов)'
  })
  Realestate_client_status.create({
    id: 4,
    name: 'В работе (Переговоры)'
  })
  Realestate_client_status.create({
    id: 5,
    name: 'В работе (Принятие решение)'
  })
  Realestate_client_status.create({
    id: 6,
    name: 'Снял у нас'
  })
  Realestate_client_status.create({
    id: 7,
    name: 'Снял сам'
  })
  Realestate_client_status.create({
    id: 8,
    name: 'Отложенный спрос'
  })
  Realestate_client_status.create({
    id: 9,
    name: 'Остается у себя'
  })
  Realestate_client_status.create({
    id: 10,
    name: 'Резиновый'
  })

  Seting.create({
    id: 1,
    ipphones: [],
    cianexport: [],
    avitoexport: []
  });



  Shop_catalog.generateCatalog()

  Cian_PropertyType.create({
    value: 'building',
    caption: 'здание'
  });

  Cian_PropertyType.create({
    value: 'freeAppointment',
    caption: 'помещение свободного назначения'
  });

  Cian_PropertyType.create({
    value: 'garage',
    caption: 'гараж'
  });

  Cian_PropertyType.create({
    value: 'industry',
    caption: 'производство'
  });

  Cian_PropertyType.create({
    value: 'land',
    caption: 'земля'
  });

  Cian_PropertyType.create({
    value: 'office',
    caption: 'офис'
  });

  Cian_PropertyType.create({
    value: 'shoppingArea',
    caption: 'торговая площадь'
  });

  Cian_PropertyType.create({
    value: 'warehouse',
    caption: 'склад'
  });


  Adress.create({
    uid: '7dbe816b-5325-49a9-69bc-080b91ffe1ed',
    name: 'Подсосенкий пер.',
    tip: 'Отдельно стоящее здание'
  });

  Adress.create({
    uid: '0277bc35-f397-45f9-dce8-3dac7b5bae16',
    name: 'Курская ул.',
    tip: 'бизнес-центр'
  });

  Room_tip.create({
      id: 1,
      name: "Офис"
  });

  Room_tip.create({
    id: 2,
    name: "Магазин"
  });

  Room_tip.create({
    id: 3,
    name: "Склад"
  });

  Room_operation.create({
    id: 1,
    name: "Аренда"
  });

  Room_operation.create({
    id: 2,
    name: "Продажа"
  });

  Room_operation.create({
    id: 3,
    name: "ППА"
  });

  House_tip.create({
    id: 1,
    name: "Отдельно стоящее"
  });

  House_tip.create({
    id: 2,
    name: "Бизнес центр"
  });

  House.create({
    uid: '111111-f397-45f9-dce8-3dac7b5bae16',
    name: 'Атриум',
    tip: 2,
    house: '22/3',
    addressUid: '0277bc35-f397-45f9-dce8-3dac7b5bae16'
  });

  Room.create({
    uid: '2222222-f397-45f9-dce8-3dac7b5bae16',
    houseUid: '111111-f397-45f9-dce8-3dac7b5bae16',
    name: 'Офис 1',
    tip: 1,
    square: 56,
    operation: 1
  });

  Room.create({
    uid: '3333333-f397-45f9-dce8-3dac7b5bae16',
    houseUid: '111111-f397-45f9-dce8-3dac7b5bae16',
    name: 'Магазин',
    tip: 2,
    square: 48,
    operation: 2
  });

  Realestate_opp.create({
    id: 1,
    name: "Аренда"
  });
  Realestate_opp.create({
    id: 2,
    name: "Продажа"
  });

  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    email: 'moderator@rent21.ru',
    username: 'moderator@rent21.ru',
    password: '$2a$08$/uunNEX8hzsXR0wx7GT27.EdB5B6bm9LP/vIQpVH6eFbNeYWn2o3e',
  }).then(user => {
    user.addRoles([2])
  });

  User.create({
    email: 'admin@rent21.ru',
    username: 'admin@rent21.ru',
    password: '$2a$08$CDC.skAJBbHE8/BBzHC5bOf/eIr8jbH5j1GpJTh9x/.PHFY.s7HwO',
  }).then(user => {
    user.addRoles([3])
  });

  User.create({
    email: 'firsovpro@yandex.ru',
    username: 'firsovpro@yandex.ru',
    password: '$2a$08$/uunNEX8hzsXR0wx7GT27.EdB5B6bm9LP/vIQpVH6eFbNeYWn2o3e',
  }).then(user => {
    user.addRoles([3])
  });
/*
  db.sequelize.query("SELECT * FROM test_adRes21", {
  }).then(items=>{
    console.log('length',items[0].length)
    items[0].forEach(itemAdress => {
      itemAdress.METRO = itemAdress.METRO.split('|');
      Rent21_address.create({
        uid: itemAdress.UID,
        fields: itemAdress
      })
    })
  })

  db.sequelize.query("SELECT * FROM test_buid21", {
  }).then(items=>{
    console.log('length',items[0].length)
    items[0].forEach(itemAdress => {
      Rent21_building.create({
        uid: itemAdress.UID,
        fields: itemAdress
      })
    })
  })

  db.sequelize.query("SELECT * FROM test_linc21", {
  }).then(items=>{
    console.log('length',items[0].length)
    items[0].forEach(itemAdress => {
      Rent21_linc.create({
        puid: itemAdress.PUID,
        val: itemAdress.VAL
      })
    })
  })

  db.sequelize.query("SELECT * FROM test_ob21", {
  }).then(items=>{
    console.log('length',items[0].length)
    items[0].forEach(itemAdress => {
      Rent21_ob.create({
        uid: itemAdress.UID,
        fields: itemAdress
      })
    })
  })
*/
  const ss = require('sequelize')
  db.sequelize.query("SELECT * FROM test_linc21", {
  }).then(items=>{
    const promiseAR = [];
    console.log('length',items[0].length)
    items[0].forEach(itemAdress => {
      promiseAR.push(new Promise(function(resolve, reject) {
        Rent21_linc.create({
          puid: itemAdress.PUID,
          val: itemAdress.VAL
        }).then(item=>{
          resolve()
        })
      }));
    })
    Promise.all(promiseAR).then(
      result => {
        db.sequelize.query("select DISTINCT UID FROM fields", {
        }).then(items=>{
          const promiseAR = [];
          items[0].forEach(item => {
            //console.log(item);
            promiseAR.push(new Promise(function(resolve, reject) {
              db.sequelize.query("select * FROM fields WHERE UID = '"+item.UID+"'", {
              }).then(items=>{
                const ob ={}
                items[0].forEach(item => {
                  ob.tip = item.TIP
                  ob.uid = item.UID
                  ob[item.TITLE] = item.VAL;
                })
                Rent21_all.create({
                  uid:ob.uid,
                  tip:ob.tip,
                  fields: ob
                }).then(items =>{
                  resolve()
                })
              })
            }));
          })
          Promise.all(promiseAR).then(
            result => {
              console.log('Ипорт завершён');
              Rent21_all.findAll({
                attributes:[
                  [ss.literal('DISTINCT `tip`'), 'tip']
                ],
              }).then(items=>{
                items.forEach(item=>{
                  Rent21_all.findAll({
                    attributes:[
                      [ss.fn('COUNT', ss.col('uid')), 'count'],
                      [ss.fn('CONCAT',item.dataValues.tip),'tip']
                    ],
                    where:{
                      tip: {
                        [ss.Op.in]:[item.dataValues.tip]
                      }
                    }
                  }).then(items=>{
                    items.forEach(item=>{
                      console.log(item.dataValues.tip, item.dataValues.count)
                    })
                  })
                })
                generateOwners()
              })
            }
          );
        })
      }
    );
  })


  //User.roles.create({



}
// db.sequelize.sync();


db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


const corsOptions = {
  // origin: "http://localhost:3000"
}
const app = express()
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/realestate.routes')(app);
require('./routes/shop.routes')(app);
require('./routes/sering.routes')(app);
 require('./routes/map.routes')(app);


export default {
  path: '/api',
  handler: app
}
