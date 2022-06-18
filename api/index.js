const express = require('express')
const cors = require("cors")

const db = require("./models");
const Role = db.role;
const Adress = db.address;
const Shop_catalog = db.shop_catalog;

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUID() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function initial() {
  Shop_catalog.generateCatalog()
  Adress.create({
    uid: generateUID(),
    name: 'Подсосенкий пер. 23',
    tip: 'Отдельно стоящее здание'
  });
  Adress.create({
    uid: generateUID(),
    name: 'Курская ул. 87',
    tip: 'бизнес-центр'
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
