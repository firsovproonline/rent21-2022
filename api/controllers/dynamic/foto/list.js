const {Op} = require("sequelize");
const startDate = new Date();
const where = `
 WHERE  UID in ('`+req.query.id+`') ORDER BY STEP
`;
const sql = 'SELECT UID,ID,TITLE,STEP from foto '+where

db.sequelize.query(sql).then(items=>{
  res.status(200).send({
    time: (new Date().getTime() - startDate.getTime()) / 1000,
    row:items[0],
  });
})
