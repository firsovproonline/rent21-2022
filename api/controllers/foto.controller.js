const db = require("../models");
const fs = require("fs");
exports.list = (req, res) => {
  const fileContent = fs.readFileSync(__dirname +'/dynamic/foto/list.js', "utf8");
  eval(fileContent);
}
exports.get = (req, res) => {
  const fileContent = fs.readFileSync(__dirname +'/dynamic/foto/get.js', "utf8");
  eval(fileContent);
}
