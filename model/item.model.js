const { connection } = require("../database/db");

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

module.exports = { 
    getItems
}