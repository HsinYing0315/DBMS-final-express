const { connection } = require("../database/db");

const addItem = async (data) => {
  console.log("add new item")
  const keys = Object.keys(data)
  const values = Object.values(data)

  console.log(keys)
  let keyString = keys[0]
  let valueString = "'" + values[0] + "'"
  for(let i = 1; i < keys.length; i ++) {
    keyString  += ", " + keys[i]
    valueString += ", '" + values[i] + "'"
  }

  const now = new Date()
  const YY = now.getFullYear()
  const MM = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth()
  const DD = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
  const hh = (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":";
  const mm = (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ":";
  const ss = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const nowTime = YY + "-" + MM + "-" + DD + " " + hh + mm + ss

  await connection.query(`INSERT INTO item (${keyString}, startDate) VALUES (${valueString}, '${nowTime}');`, (err, res) => {
    if (err) {
        console.error(err);
    }
  });
}
const getItems = async () => {
  console.log("fetch all items")
  
  const rows = await new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM item`, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  return rows
}
const updItem = async (id, data) => {
  console.log("item updated")
  const keys = Object.keys(data)
  const values = Object.values(data)

  let updString = keys[0] + "=" + "'" + values[0] + "'"
  for(let i = 1; i < keys.length; i ++) {
    updString += "," + keys[i] + "=" + "'" + values[i] + "'"
  }

  await connection.query(`UPDATE item SET ${updString} WHERE id = '${id}';`, (err, res) => {
    if (err) {
        console.error(err)
    }
  })
}
const delItem = async (id) => {
  await connection.query(`DELETE FROM item WHERE id = ${id}`, (err, result) => {
    if(err) {
      console.error(err)
    }
  })
}

module.exports = {
  addItem, 
  getItems,
  updItem,
  delItem
}