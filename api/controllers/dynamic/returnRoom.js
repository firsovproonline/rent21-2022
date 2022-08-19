const {Op} = require("sequelize");

const startDate = new Date();
const outAr = {};
const where = `
 AND  JSON_EXTRACT(rent21_alls.fields, "$.TIP") in ('Офис','Магазин')
 AND  JSON_EXTRACT(rent21_alls_2.fields, "$.RAJON") = 'Тверской'
`;
const sqlCount = `SELECT
  COUNT(rent21_alls.uid) as count
FROM rent21_alls
  INNER JOIN rent21_lincs
    ON rent21_alls.uid = rent21_lincs.val
  INNER JOIN rent21_alls rent21_alls_1
    ON rent21_lincs.puid = rent21_alls_1.uid
  INNER JOIN rent21_lincs rent21_lincs_1
    ON rent21_alls_1.uid = rent21_lincs_1.val
  INNER JOIN rent21_alls rent21_alls_2
    ON rent21_lincs_1.puid = rent21_alls_2.uid
WHERE rent21_alls.tip = 'ob21' ` + where;

const sql = `SELECT
  rent21_alls.uid,
  rent21_alls.fields AS ob,
  rent21_alls_1.fields AS build,
  rent21_alls_2.fields AS address
FROM rent21_alls
  INNER JOIN rent21_lincs
    ON rent21_alls.uid = rent21_lincs.val
  INNER JOIN rent21_alls rent21_alls_1
    ON rent21_lincs.puid = rent21_alls_1.uid
  INNER JOIN rent21_lincs rent21_lincs_1
    ON rent21_alls_1.uid = rent21_lincs_1.val
  INNER JOIN rent21_alls rent21_alls_2
    ON rent21_lincs_1.puid = rent21_alls_2.uid
WHERE rent21_alls.tip = 'ob21' `+ where;


db.sequelize.query(sqlCount).then(items=>{
  const count = items[0][0].count
  db.sequelize.query(sql).then(items=>{
    const outOB = {}
    items[0].forEach(item=>{
      if(!outOB[item.address.uid]){
        outOB[item.address.uid]= []
      }
      outOB[item.address.uid].push(item)
    })
    const outAr = []
    let i = 0
    Object.keys(outOB).forEach(item=>{
      outAr.push(outOB[item])
      i++
    })
    res.status(200).send({
      time: (new Date().getTime() - startDate.getTime()) / 1000,
      rows:outAr,
      countOb:count,
      total: i
    });
  })

})
