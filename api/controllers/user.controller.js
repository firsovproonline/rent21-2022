const db = require("../models");
const gm = require('gm');

const {Op, fn} = require("sequelize");
const fs = require('fs')

exports.allAccess = (req, res) => {
  if(req.userId){
    const User = db.user;
    User.findByPk(req.userId).then(user => {
      const userOut = {
        email: user.email,
        roles: []
      };

      user.getRoles().then(roles => {
        roles.forEach(role => {
          userOut.roles.push(role.name)
        })
        res.status(200).send(userOut);
      })

    });
  }else{
    res.status(200).send({});
  }
//  console.log(req.userId)
//  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.postphoto = (req, res) => {
  const User = db.user;
  let photo = fs.readFileSync('././temp/'+req.file.filename);
  gm('././temp/'+req.file.filename).resize(null, 170).toBuffer('JPG', function(err, buffer) {
    User.update(
      {
        photo: buffer
      },
      {
        where: {
          id: req.header('iduser'),
        },
      }
    ).then(items=>{
      res.status(200).send('=====');
    })
  })
}

exports.photo = (req, res) => {
  const User = db.user;
  User.findAll({
    attributes: [
      'photo',
    ],
    where: {
      id: {
        [Op.in]:[req.query.id]
      }
    }
  }).then(items =>{
    items.forEach(item=>{
      if(item.photo){
        // const buffer = new Buffer(item.photo, 'binary');
        res.status(200).send(item.photo);
      }else{
        res.status(200).send('');
      }
    })
  })
}

exports.listUsers = (req, res) => {
  const User = db.user;
  const promiseAR = [];
  const promiseAR1 = [];
  const users = []
  promiseAR.push(new Promise(function(resolve, reject) {
    User.findAll({
      attributes: ['id', 'username', 'fields']
    }).then(items=>{

      items.forEach(user =>{
        // console.log(user)
        user.dataValues.roles = []
        promiseAR1.push(new Promise(function(resolve, reject) {
          user.getRoles().then(roles => {
            roles.forEach(role => {
              user.dataValues.roles.push(role.name)
            })
            if(! user.dataValues.fields){
              user.dataValues.fields = {}
            }
            if(! user.dataValues.fields.access){
              user.dataValues.fields.access = []
            }
            users.push(user)
            resolve()
          })
        }))
      })
      Promise.all(promiseAR1).then(
        result => {
          resolve()
        },
        error => console.log("Ошибка: ", error.message)
      );


    })

  }))

  Promise.all(promiseAR).then(
    result => {
      res.status(200).send(users);
    },
    error => console.log("Ошибка: ", error.message)
  );

};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
