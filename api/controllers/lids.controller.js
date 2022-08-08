const db = require("../models");
const {fn, col} = require("sequelize");
const ss = require("sequelize");
exports.getID = (req, res) => {
  const Table = db.Rent21_lids;
  Table.findOne({
    where: {
      uid: req.query.id
    }
  }).then(item=>{
    res.send(item)
  })
}


exports.get = (req, res) => {
  let page = 0
  const limit = 25
  if(req.body.page) page = req.body.page
  let offset =  page * limit
  const Table = db.Rent21_lids;
  Table.findAll({
    attributes: [[fn('COUNT', db.sequelize.col('uid')), 'count']]
  }).then(items => {
    let total = items[0].dataValues.count
    Table.findAll({
      limit: limit,
      offset: offset
    }).then(items=>{
      res.send({total: total, rows: items})
    })
  })
}
