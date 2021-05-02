const sql = require("../config/db_connection.js");
const { v4: uuidv4 } = require('uuid');
const { registerValidation, loginValidation } = require('../validation/joi.validation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 


exports.registerUser = async (req, res) => {  
    //Joi Validation
    const { error } = registerValidation(req.body);  
    if(error) return res.status(400).send({
        type: "error",
        path: error.details[0].path[0],
        message: error.details[0].message
    });  
  
    sql.query(`select 1 from users where email='${req.body.email}'`, async (err, result) => { 
    if(err) throw err;
    if(result.length > 0){
        return res.send({
            type: "error",
            message: "Email Already Exist!"
        });
    }else{ 

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const users = {
            user_id: uuidv4(), 
            password: hashPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };  

        const query_insert = ` 
            insert into users set ?
        `; 
        sql.query(query_insert, users, (err, result) => {
            if(err){
                console.log(err);
                return res.send(err);
            }else{
                console.log(`New Data Inserted: ${result.affectedRows}\nName: ${users.firstname} ${users.lastname}`);
                return res.send({
                    type: "success",
                    result
                });
            }
        });
    }
    });  
}


exports.loginUser = (req, res) => {
    // Joi Validation 
    const { error }  = loginValidation(req.body);
    if(error) return res.status(400).send({
        type: "error",
        path: error.details[0].path[0],
        message: error.details[0].message
    });
     
    const { email, password } = req.body;

    const findEmailQuery = `
        select * from users where email=?
    `; 

    sql.query(findEmailQuery, [email], async (err, result) => {
        if(err) throw err;
        if(result.length > 0) { 
            const user = result[0]; 
            const validPass = await bcrypt.compare(password, user.password); 

            if(!validPass) return res.status(400).send({
                type: "error",
                message: "Email or password did not match!"
            }); 

            const token = jwt.sign({_id: user.user_id}, process.env.TOKEN_SECRET); 
            res.header('auth-token', token).send(token); 


        }else{
           return res.status(400).send({
               type: "error",
               message: "Email or password did not match!"
           });
        }
    });  
}

exports.getUsers = (req, res) => {
    const getUsersQuery = `
        select * from users order by created_at desc
    `;
    sql.query(getUsersQuery, (err, result) => {
        if(err) throw err; 
        delete result[0].password; 
        return res.send(result);
    });

}


