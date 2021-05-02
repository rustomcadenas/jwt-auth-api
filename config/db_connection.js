const db_config = require("./db.js");
const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: db_config.db_host,
    user: db_config.db_user, 
    database: db_config.db_name
});

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected to the database`);
});

module.exports = connection;




