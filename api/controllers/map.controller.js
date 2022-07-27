const db = require("../models");
const {fn, col} = require("sequelize");
const ss = require("sequelize");
exports.mapget = (req, res) => {
  const ss = require('sequelize')
  const Adress = db.Rent21_address
  Adress.findAll({
    attributes:[
      'uid',
      [ss.fn('JSON_EXTRACT', ss.col('fields'), ss.literal('"$.LAT"')),'LAT'],
      [ss.fn('JSON_EXTRACT', ss.col('fields'), ss.literal('"$.LNG"')),'LNG']
    ]
  }).then(items=>{
    res.status(200).send(items)
  })
}
