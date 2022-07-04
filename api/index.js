const express = require('express')
const cors = require("cors")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require("./models");

const Realestate_opp = db.realestate_opp;
const Realestate_client_opp = db.realestate_client_opp;
const Realestate_client_item = db.realestate_client_item;
const Realestate_client_status = db.realestate_client_status;


const Role = db.role;
const Adress = db.address;
const House = db.house;
const Room = db.room;

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

function initial() {
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

  //User.roles.create({



}
db.sequelize.sync();

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/

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


export default {
  path: '/api',
  handler: app
}
