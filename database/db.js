const mysql = require("mysql");

const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "Wu920315",
    database: "final"
};
const connection = mysql.createConnection(mysqlConfig)

connection.connect((error) => {
    if (!!error){
        console.log(error);
    } else {
        console.log('connected');
    }
});

module.exports = { connection }