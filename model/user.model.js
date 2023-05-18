const { connection } = require("../database/db");

const registerUser = async (uid) => {
    connection.query(`INSERT INTO user (uid, rating) VALUES ('${uid}', 5.0);`, (err, res) => {
        if (err) {
            console.error(err);
        }
    });
}
const getUser = async (uid) => {
    const rows = await new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user WHERE uid = '${uid}';`, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
    });

    return rows
}
const editPhone = async (uid, phone) => {
    connection.query(`UPDATE user SET phone = '${phone}' WHERE uid = '${uid}';`, (err, res) => {
        if (err) {
            console.error(err)
        }
    })
}
const editRating = async (uid, rating) => {
    connection.query(`UPDATE user SET rating = '${rating}' WHERE uid = '${uid}';`, (err, res) => {
        if (err) {
            console.error(err)
        }
    })
}


module.exports = { 
    registerUser,
    getUser,
    editPhone,
    editRating
}