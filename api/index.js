import ss from "sequelize";

const express = require('express')
const cors = require("cors")
const fs = require('fs')
const request = require('request');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require("./models");

const Realestate_opp = db.realestate_opp;
const Realestate_client_opp = db.realestate_client_opp;
const Realestate_client_item = db.realestate_client_item;
const Realestate_client_status = db.realestate_client_status;

const Rent21_owner = db.Rent21_owner;
const Rent21_contact = db.Rent21_contact;
const Rent21_address = db.Rent21_address;
const Rent21_building = db.Rent21_building;
const Rent21_linc = db.Rent21_linc;
const Rent21_ob = db.Rent21_ob;
const Rent21_all = db.Rent21_all;
const Rent21_lids = db.Rent21_lids;
const Rent21_export = db.Rent21_export;
const Rent21_report = db.Rent21_report;


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

const cianItems = require("../api/config/cian.config.js");

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUID() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function getPhones(val){
  const outAr = [];
  if(val){
    val.split('|').map(item => item.trim()).forEach(item=>{
      if(item!== ''){
         const v = item.split(';');
         if(v.length > 0){
           if(v[1]==='')
             v[1] = 'Мобильный';
           outAr.push({val:v[0],typ:v[1]});
         }else{
           outAr.push({val:v[0],typ:'Мобильный'});
         }
      }
    })
  }
  return outAr;
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
            if(outOB['TEL']){
              outOB['TEL'] =  getPhones(outOB['TEL'])
            }
            if(outOB['KLEMAIL']){
              outOB['KLEMAIL'] =   getPhones(outOB['KLEMAIL'])
            }
            if(outOB['DOSTUP']){
              outOB['DOSTUP'] =  outOB['DOSTUP'] != '' ? outOB['DOSTUP'].split('|').map(item => item.trim()) : []
            }
            if(outOB['METRO']){
              outOB['METRO'] =  outOB['METRO'] != '' ? outOB['METRO'].split('|').map(item => item.trim()) : []
            }
            if(outOB['RAJON']){
              outOB['RAJON'] =  outOB['RAJON'] != '' ? outOB['RAJON'].split('|').map(item => item.trim()) : []
            }


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
          console.log('+++++++++++generateAddrees+++++++++++++++++');
          //generateAddrees();
        }
      );

  })

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

  const ss = require('sequelize')
  db.sequelize.query("SELECT * FROM fields WHERE TIP = 'linc21'", {
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
    const listTIP = [];
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
                const metro = {}
                items[0].forEach(item => {
                  ob.tip = item.TIP
                  ob.uid = item.UID
                  // работаем с метро
                  switch (item.TITLE)
                  {
                    case "METRO":
                    case "GLMETRO":
                    case "UD":
                    case "UDTIP":
                      if(!metro[item.PUID]){
                        metro[item.PUID] = {}
                      }
                      metro[item.PUID][item.TITLE] = item.VAL;
                      break;
                    default:
                      ob[item.TITLE] = item.VAL;
                  }
                })

                if(Object.keys(metro).length > 0){
                  ob['METRO'] = [];
                  Object.values(metro).forEach(valM=>{
                    ob['METRO'].push({
                      NAME: valM.METRO,
                      GLMETRO: valM.GLMETRO,
                      UD: valM.UD,
                      UDTIP: valM.UDTIP,
                    })
                  })
                }
                ob.cian = {

                };
                if(ob.tip === 'ob21'){
                  Object.keys(ob).forEach(item=>{
                    if(listTIP.indexOf(item)=== -1){
                      listTIP.push(item)
                    }
                  })
                  ob.cian.Category = ''
                  if(ob.OPP  === 'Аренда'){
                    if (ob.TIP === 'Офис' ){
                      ob.cian = cianItems.rent.officeRent
                      // ob.cian.Category = 'officeRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Помещение свободного назначения' ){
                      ob.cian = cianItems.rent.freeAppointmentObjectRent
//                      ob.cian.Category = 'freeAppointmentObjectRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Здание' ){
                      ob.cian = cianItems.rent.buildingRent
//                      ob.cian.Category = 'buildingRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Квартира' ){
                      ob.cian = cianItems.rent.flatRent
//                      ob.cian.Category = 'flatRent'
                      ob.propertytype = 'Жилая'
                    }
                    if (ob.TIP === 'Торговая площадь' ){
                      ob.cian = cianItems.rent.shoppingAreaRent
                      // ob.cian.Category = 'shoppingAreaRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Склад' ){
                      ob.cian = cianItems.rent.warehouseRent
                      // ob.cian.Category = 'warehouseRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Производство' ){
                      ob.cian = cianItems.rent.industryRent
                      // ob.cian.Category = 'industryRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Гараж' ){
                      ob.cian = cianItems.rent.garageRent
//                      ob.cian.Category = 'garageRent'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Дом/дача' ){
                      ob.cian = cianItems.rent.houseRent
                      // ob.cian.Category = 'houseRent'
                      ob.propertytype = 'Загородная'
                    }

                  }
                  if(ob.OPP  === 'Продажа'){
                    if (ob.TIP === 'Офис'){
                      ob.cian.Category = 'officeSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Помещение свободного назначения' ){
                      ob.cian.Category = 'freeAppointmentObjectSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Здание' ){
                      ob.cian.Category = 'buildingSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Квартира' ){
                      ob.cian.Category = 'flatSale'
                      ob.propertytype = 'Жилая'
                    }
                    if (ob.TIP === 'Торговая площадь' ){
                      ob.cian.Category = 'shoppingAreaSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Склад' ){
                      ob.cian.Category = 'warehouseSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Квартира новостройка' ){
                      ob.cian.Category = 'newBuildingFlatSale'
                      ob.propertytype = 'Жилая'
                    }
                    if (ob.TIP === 'Готовый бизнес' ){
                      ob.cian.Category = 'businessSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Производство' ){
                      ob.cian.Category = 'industrySale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Гараж' ){
                      ob.cian.Category = 'garageSale'
                      ob.propertytype = 'Коммерческая'
                    }
                    if (ob.TIP === 'Дом/дача' ){
                      ob.cian.Category = 'houseSale'
                      ob.propertytype = 'Загородная'
                    }

                  }
                  if(typeof(ob.cian.FloorNumber) !=='undefined'){
                    ob.cian.FloorNumber = ob.ETAG
                  }
                  if(typeof(ob.cian.TotalArea) !=='undefined'){
                    ob.cian.TotalArea = ob.PLALL
                  }
                }

                Rent21_all.create({
                  uid:ob.uid,
                  tip:ob.tip,
                  fields: ob,
                  cian: ob.cian
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
              })
              // Выносим собственников в отдельную таблицу
              Rent21_all.findAll({
                where:{
                  tip: {
                    [ss.Op.in]:['soBst21', 'koNt21']
                  }
                }
              }).then(items=>{
                const notUid = []
                items.forEach(item=>{
                  if(notUid.indexOf(item.dataValues.uid)===-1){
                    if(item.dataValues.tip === 'soBst21'){
                      Rent21_owner.create({
                        fields: item.dataValues.fields,
                        uid: item.dataValues.uid
                      })
                      notUid.push(item.dataValues.uid)
                    }
                    if(item.dataValues.tip === 'koNt21'){
                      Rent21_contact.create({
                        fields: item.dataValues.fields,
                        uid: item.dataValues.uid
                      })
                      notUid.push(item.dataValues.uid)
                    }
                  }
                })
              })

            }
          );
        })
      }
    );
  })
  // загружаем конфиг
  const fileContent = fs.readFileSync(__dirname +'../../config/config.json', "utf8");
  JSON.parse(fileContent).cian.forEach(item =>{
    Rent21_export.create({
      uid: item.uid,
      tip: item.tip,
      fields: item.fields,
      name: item.name
    })
  })
}

const flagCreate = true;
if(flagCreate){
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
}else{
  db.sequelize.sync().then(()=>{
      const timerIdCian = setInterval( ()=>{
        request({
          url: "https://public-api.cian.ru/v1/get-order",
          method: "GET",
          headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjI0MTQzNDd9.tnl_IpjFbd6npeK5eZawYTOxmBudZMLey70YhS3jRQs",
            "content-type": "application/json"
          },
          body: ""
        }, function(error, response, body) {
          if (error) {
            console.log('Ошибка запроса Циан')
          }
          else {
            if (response.statusCode == 200) {
              const J = JSON.parse(body).result.offers;
              Rent21_report.destroy({
                truncate: true,
              }).then(()=>{
                J.forEach(item=>{
                  Rent21_report.create({
                    offerId: item.offerId,
                    externalId: item.externalId,
                    status: item.status,
                    errors: item.errors,
                    warnings: item.warnings,
                    url: item.url
                  })
                })
                console.log('cian загружен', new Date())
              })
            }
            else {

            }
          }
        });

      },200000)
    }
  );
}

const corsOptions = {
  origin: "*"
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

/*
const io = require('socket.io')({  cors: {
    origin: "http://localhost:3021"
  }});
io.on('connection', client => {
  console.log('client', client.handshake.headers.token);
});
io.listen(3022);

 */

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/realestate.routes')(app);
require('./routes/shop.routes')(app);
require('./routes/sering.routes')(app);
require('./routes/map.routes')(app);
require('./routes/lids.routers')(app);
require('./routes/foto.routes')(app);


export default {
  path: '/api',
  handler: app
}
