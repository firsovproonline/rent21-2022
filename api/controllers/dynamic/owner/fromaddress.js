const {Op} = require("sequelize");
const sequelize = require("sequelize");
const startDate = new Date();
const outAr = [];
const Linc = db.Rent21_linc;

Linc.findAll({
  attributes: [
    'val'
  ],
  where: {
    puid: {
      [Op.in]:[req.query.id]
    }
  }
}).then(items => {
  const uids = []
  items.forEach(itemLinc => {
    uids.push(itemLinc.val)
  })
  db.Rent21_all.findAll({
    attributes:[
      'fields',
      'cian',
      'uid'
    ],
    where: {
      uid: {
        [Op.in]:uids
      },
      tip: {
        [Op.in]:['ob21']
      }
    }
  }).then(items => {
    items.forEach(item =>{
      if(outAr.indexOf(item.fields.SOBST)===-1)
      outAr.push(item.fields.SOBST)
    })
    const sql =`SELECT
        rent21_owners.uid,
        rent21_owners.fields AS owner,
        rent21_contacts.fields AS contact
      FROM rent21_owners
        RIGHT OUTER JOIN rent21_lincs
          ON rent21_owners.uid = rent21_lincs.puid
        INNER JOIN rent21_contacts
          ON rent21_lincs.val = rent21_contacts.uid
      WHERE rent21_owners.uid IN('`+ outAr.join("','") + `')
      ORDER BY rent21_owners.uid`
    // console.log(sql)
    db.sequelize.query(sql).then(items=>{
      const outOb = {}
      items[0].forEach(item=>{
        if(!outOb[item.owner.UID]){
          outOb[item.owner.UID] = {
            UID: item.owner.UID,
            EMAIL: item.owner.EMAIL,
            KOMIS: item.owner.KOMIS,
            KOMISREM: item.owner.KOMISREM,
            NAME: item.owner.NAME,
            SITE: item.owner.SITE,
            contacts: []
          }
        }
        outOb[item.owner.UID].contacts.push(item.contact)
      })
      const outAr = []
      Object.keys(outOb).forEach(item=>{
        outAr.push(outOb[item])
      })
      res.send({
        time: (new Date().getTime() - startDate.getTime()) / 1000,
        rows:outAr,
      })

    })
  })

})
