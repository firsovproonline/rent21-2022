const {Op} = require("sequelize");
const sequelize = require("sequelize");
const startDate = new Date();
const outAr = [];
const Linc = db.Rent21_linc;

function getOppTip(Category){
  switch (Category){
    case 'shoppingAreaSale':
      return ['Продажа','Торговая площадь']
      break
    case 'warehouseSale':
      return ['Продажа','Склад']
      break
    case 'industrySale':
      return ['Продажа','Производство']
      break
    case 'freeAppointmentObjectSale':
      return ['Продажа','Помещение свободного назначения']
      break
    case 'officeSale':
      return ['Продажа','Офис']
      break
    case 'commercialLandSale':
      return ['Продажа','Коммерческая земля']
      break
    case 'buildingSale':
      return ['Продажа','Здание']
      break
    case 'businessSale':
      return ['Продажа','Готовый бизнес']
      break
    case 'garageSale':
      return ['Продажа','Гараж']
      break
    case 'houseShareSale':
      return ['Продажа','Часть дома']
      break
    case 'landSale':
      return ['Продажа','Участок']
      break
    case 'townhouseSale':
      return ['Продажа','Таунхаус']
      break
    case 'cottageSale':
      return ['Продажа','Коттедж']
      break
    case 'houseSale':
      return ['Продажа','Дом/дача']
      break
    case 'roomSale':
      return ['Продажа','Комната']
      break
    case 'newBuildingFlatSale':
      return ['Продажа','Квартира в новостройке']
      break
    case 'flatSale':
      return ['Продажа','Квартира']
      break
    case 'flatShareSale':
      return ['Продажа','Доля в квартире']
      break
    case 'commercialLandRent':
      return ['Аренда','Коммерческая земля']
      break
    case 'buildingRent':
      return ['Аренда','Здание']
      break
    case 'garageRent':
      return ['Аренда','Гараж']
      break
    case 'houseShareRent':
      return ['Аренда','Часть дома']
      break
    case 'townhouseRent':
      return ['Аренда','Таунхаус']
      break
    case 'cottageRent':
      return ['Аренда','Коттедж']
      break
    case 'houseRent':
      return ['Аренда','Дом/дача']
      break
    case 'roomRent':
      return ['Аренда','Комната']
      break
    case 'bedRent':
      return ['Аренда','Койко-место']
      break
    case 'flatRent':
      return ['Аренда','Квартира']
      break
    default:
      return ['Аренда','Офис']
  }
}

Linc.findAll({
  attributes: [
    'val'
  ],
  where: {
    puid: {
      [Op.in]:[req.query.id]
    }
  }
}).then(items => {
  const uids = []
  items.forEach(itemLinc => {
    uids.push(itemLinc.val)
  })
  db.Rent21_all.findAll({
    attributes:[
      'fields',
      'cian',
      'uid'
    ],
    where: {
      uid: {
        [Op.in]:uids
      },
      tip: {
        [Op.in]:['ob21']
      }
    }
  }).then(items => {
    items.forEach(item =>{
      if(! outAr.find(etag => etag.id === item.cian.FloorNumber)){
        const ob = {
          id: item.cian.FloorNumber,
          items:[]
        }
        outAr.push(
          ob
        )
      }
      const opptip = getOppTip(item.cian.Category)
      outAr.find(etag => etag.id === item.cian.FloorNumber).items.push({
        TIP: opptip[1],
        OPP: opptip[0],
        PLALL: item.cian.TotalArea,
        UID: item.uid
      })
    })
    outAr.sort( (a, b) => a.id > b.id ? 1 : -1)
    res.send({
      time: (new Date().getTime() - startDate.getTime()) / 1000,
      rows:outAr,
    })

  })

})

