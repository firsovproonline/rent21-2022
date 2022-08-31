const db = require("../models");
exports.setings = (req, res) => {
  const Setings = db.Setings;
  Setings.findAll({}).then(items=>{
    res.status(200).send(items);
  })
}

exports.setingsSmall = (req, res) => {
  const Setings = db.Setings;
  Setings.findAll({}).then(items=>{
    res.status(200).send(items);
  })
}

exports.savesetings = (req, res) => {
  const Setings = db.Setings;
  console.log(req.body)
  Setings.update(
    {
      ipphones: req.body.ipphones,
      cianexport: req.body.cianexport,
      avitoexport: req.body.avitoexport
    },
    {
      where: {
        id: 1,
      },
    }
  ).then(items=>{
    Setings.findAll({}).then(items=>{
      res.status(200).send(items);
    })
  })
}

