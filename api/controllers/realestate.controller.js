const db = require("../models");

exports.address = (req, res) => {
  const Address = db.address;
  Address.findAll().then(items => {
    res.status(200).send(items);
  })
};
