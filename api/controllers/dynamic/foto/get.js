const {Op} = require("sequelize");
const where = `
 WHERE ID in ('`+req.query.id+`')
`;
const sql = 'SELECT THUMBNAIL,ID from foto '+where
db.sequelize.query(sql).then(items=>{
  const buffer = new Buffer(items[0][0].THUMBNAIL, 'binary');
  res.status(200).send(buffer);
})
