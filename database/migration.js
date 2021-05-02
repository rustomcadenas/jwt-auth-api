const connection = require("../config/db_connection.js");

exports.createDB = (req, res) => {
    const db_name = "jwt_auth_practice"; 

    const sql = `
        create database ${db_name}
    `; 

    connection.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(err);

        }
        console.log(result);
        res.send(result);
    })

}

exports.createTableUsers = (req, res) => {
    const table_name = "users";

    const sql = `
        create table ${table_name} (
            user_id varchar(255) unique not null, 
            password varchar(255) not null,
            firstname varchar(100) not null,
            lastname varchar(100) not null,
            email varchar(100) not null unique,
            active int(1) not null default 1, 
            created_at timestamp default current_timestamp,
            updated_at datetime default current_timestamp on update current_timestamp,
            primary key (user_id)
        )
    `;

    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.send(err); 
        }else{
            console.log(result);
            res.send(result);
        }
    });

}