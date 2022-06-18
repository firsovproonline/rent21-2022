const db = require("../models");

exports.catalog = (req, res) => {
  const Shop_catalog = db.shop_catalog;
  Shop_catalog.getTree(items => {
    res.status(200).send(items);
  })
};
