const {Op} = require("sequelize");
const where = `
 WHERE ID in ('`+req.query.id+`')
`;
const sql = 'SELECT THUMBNAIL,ID from foto '+where
db.sequelize.query(sql).then(items=>{
  res.status(200).send(items[0][0].THUMBNAIL);
})
