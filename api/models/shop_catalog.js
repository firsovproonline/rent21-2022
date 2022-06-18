function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUID() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
module.exports = (sequelize, Sequelize) => {
  const Shop_catalog = sequelize.define("shop_catalog", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: Sequelize.STRING(64)
    },
    puid: {
      type: Sequelize.STRING(64)
    },
    name: {
      type: Sequelize.STRING
    },
    svg: {
      type: Sequelize.TEXT
    }
  });

  Shop_catalog.getTree = async function (fun){
    function getChildren(catalog, item, func1) {
      catalog.findAll({
        where: {
          puid: item.uid
        },
      }).then(items => {
        const promiseAR = [];
        items.forEach(item_ => {
          const ob = {
            items: [],
            name: item_.name,
            uid: item_.uid,
            svg: item_.svg
          }
          item.items.push(ob)
          promiseAR.push(new Promise(function(resolve, reject) {
            getChildren(catalog, ob, (item)=>{
              resolve({
                item: item
              })
            })
          }));
        })
        Promise.all(promiseAR).then(
          result => {
            func1(items)
          },
          error => console.log("Ошибка: ", error.message)
        );
      })
    }
    const outArray = []
    this.findAll({
      where: {
        puid: null
      },
    }).then(items => {
      const promiseAR = [];
      let catalog = this

      items.forEach(async item =>{
        const ob = {
          items: [],
          name: item.name,
          uid: item.uid,
          svg: item.svg
        }
        outArray.push(ob)
        promiseAR.push(new Promise(function(resolve, reject) {
          getChildren(catalog, ob, (item)=>{
            resolve({
              item: item
            })
          })
        }));
      })
      Promise.all(promiseAR).then(
        result => {
          fun(outArray)
        },
        error => console.log("Ошибка: ", error.message)
      );
    })
  }

  Shop_catalog.generateCatalog = function (){
    let uid = generateUID()
    this.create({
      uid: uid,
      name: "Кухня"
    })
    let puid = uid
    uid = generateUID()
    this.create({
      uid: uid,
      puid: puid,
      name: "Тумбы",
      svg: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.3333 14.6667H22.2507C23.8057 13.057 24.6723 10.9048 24.6667 8.66667C24.6667 8.2985 24.3682 8 24 8H19.3333V6.66667C19.3333 6.2985 19.0348 6 18.6667 6H16C15.6318 6 15.3333 6.2985 15.3333 6.66667V8H14.6667V3.33333C14.6667 2.22875 15.5621 1.33333 16.6667 1.33333C17.7712 1.33333 18.6667 2.22875 18.6667 3.33333C18.6667 3.7015 18.9652 4 19.3333 4C19.7015 4 20 3.7015 20 3.33333C20 1.49242 18.5076 0 16.6667 0C14.8257 0 13.3333 1.49242 13.3333 3.33333V8H12.6667V6.66667C12.6667 6.2985 12.3682 6 12 6H9.33333C8.96517 6 8.66667 6.2985 8.66667 6.66667V8H4C3.63183 8 3.33333 8.2985 3.33333 8.66667C3.3325 10.9056 4.20225 13.0572 5.75867 14.6667H0.666667C0.2985 14.6667 0 14.9652 0 15.3333V32.6667C0 33.0348 0.2985 33.3333 0.666667 33.3333H1.33333V39.3333C1.33333 39.7015 1.63183 40 2 40H4C4.32592 39.9998 4.60392 39.7642 4.65733 39.4427L5.13867 36.5567C5.19242 36.2355 5.47033 36.0001 5.796 36H22.204C22.5297 36.0001 22.8076 36.2355 22.8613 36.5567L23.3427 39.4427C23.3961 39.7642 23.6741 39.9998 24 40H26C26.3682 40 26.6667 39.7015 26.6667 39.3333V33.3333H27.3333C27.7015 33.3333 28 33.0348 28 32.6667V15.3333C28 14.9652 27.7015 14.6667 27.3333 14.6667ZM16.6667 7.33333H18V8H16.6667V7.33333ZM10 7.33333H11.3333V8H10V7.33333ZM4.69667 9.33333H23.304C23.1126 11.4783 21.9849 13.4298 20.222 14.6667H7.78533C6.01808 13.4328 4.88733 11.4803 4.69667 9.33333ZM1.33333 32V16H13.3333V32H1.33333ZM25.3333 38.6667H24.5647L24.1767 36.338C24.0183 35.3723 23.1826 34.6643 22.204 34.6667H5.796C4.81742 34.6643 3.98167 35.3723 3.82333 36.338L3.43533 38.6667H2.66667V33.3333H25.3333V38.6667ZM26.6667 32H14.6667V16H26.6667V32Z" stroke="none"></path>
<path d="M16 26C16.3682 26 16.6667 25.7015 16.6667 25.3333V22.6667C16.6667 22.2985 16.3682 22 16 22C15.6318 22 15.3333 22.2985 15.3333 22.6667V25.3333C15.3333 25.7015 15.6318 26 16 26Z" stroke="none"></path>
<path d="M12 22C11.6318 22 11.3333 22.2985 11.3333 22.6667V25.3333C11.3333 25.7015 11.6318 26 12 26C12.3681 26 12.6666 25.7015 12.6666 25.3333V22.6667C12.6666 22.2985 12.3681 22 12 22Z" stroke="none"></path>
</svg>`
    })
    let suid = uid
    uid = generateUID()
    this.create({
      uid: uid,
      puid: suid,
      name: "Угловые"
    })
    uid = generateUID()
    this.create({
      uid: uid,
      puid: suid,
      name: "Под раковину"
    })


    uid = generateUID()
    this.create({
      uid: uid,
      puid: puid,
      name: "Подвсныые ящики",
      svg: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.3333 14.6667H22.2507C23.8057 13.057 24.6723 10.9048 24.6667 8.66667C24.6667 8.2985 24.3682 8 24 8H19.3333V6.66667C19.3333 6.2985 19.0348 6 18.6667 6H16C15.6318 6 15.3333 6.2985 15.3333 6.66667V8H14.6667V3.33333C14.6667 2.22875 15.5621 1.33333 16.6667 1.33333C17.7712 1.33333 18.6667 2.22875 18.6667 3.33333C18.6667 3.7015 18.9652 4 19.3333 4C19.7015 4 20 3.7015 20 3.33333C20 1.49242 18.5076 0 16.6667 0C14.8257 0 13.3333 1.49242 13.3333 3.33333V8H12.6667V6.66667C12.6667 6.2985 12.3682 6 12 6H9.33333C8.96517 6 8.66667 6.2985 8.66667 6.66667V8H4C3.63183 8 3.33333 8.2985 3.33333 8.66667C3.3325 10.9056 4.20225 13.0572 5.75867 14.6667H0.666667C0.2985 14.6667 0 14.9652 0 15.3333V32.6667C0 33.0348 0.2985 33.3333 0.666667 33.3333H1.33333V39.3333C1.33333 39.7015 1.63183 40 2 40H4C4.32592 39.9998 4.60392 39.7642 4.65733 39.4427L5.13867 36.5567C5.19242 36.2355 5.47033 36.0001 5.796 36H22.204C22.5297 36.0001 22.8076 36.2355 22.8613 36.5567L23.3427 39.4427C23.3961 39.7642 23.6741 39.9998 24 40H26C26.3682 40 26.6667 39.7015 26.6667 39.3333V33.3333H27.3333C27.7015 33.3333 28 33.0348 28 32.6667V15.3333C28 14.9652 27.7015 14.6667 27.3333 14.6667ZM16.6667 7.33333H18V8H16.6667V7.33333ZM10 7.33333H11.3333V8H10V7.33333ZM4.69667 9.33333H23.304C23.1126 11.4783 21.9849 13.4298 20.222 14.6667H7.78533C6.01808 13.4328 4.88733 11.4803 4.69667 9.33333ZM1.33333 32V16H13.3333V32H1.33333ZM25.3333 38.6667H24.5647L24.1767 36.338C24.0183 35.3723 23.1826 34.6643 22.204 34.6667H5.796C4.81742 34.6643 3.98167 35.3723 3.82333 36.338L3.43533 38.6667H2.66667V33.3333H25.3333V38.6667ZM26.6667 32H14.6667V16H26.6667V32Z" stroke="none"></path>
<path d="M16 26C16.3682 26 16.6667 25.7015 16.6667 25.3333V22.6667C16.6667 22.2985 16.3682 22 16 22C15.6318 22 15.3333 22.2985 15.3333 22.6667V25.3333C15.3333 25.7015 15.6318 26 16 26Z" stroke="none"></path>
<path d="M12 22C11.6318 22 11.3333 22.2985 11.3333 22.6667V25.3333C11.3333 25.7015 11.6318 26 12 26C12.3681 26 12.6666 25.7015 12.6666 25.3333V22.6667C12.6666 22.2985 12.3681 22 12 22Z" stroke="none"></path>
</svg>`

    })

    uid = generateUID()
    this.create({
      uid: uid,
      name: "Гостинная"
    })
    uid = generateUID()
    this.create({
      uid: uid,
      name: "Спальня"
    })
  }
  return Shop_catalog;
};
