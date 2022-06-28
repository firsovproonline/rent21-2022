const db = require("../models");
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
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
