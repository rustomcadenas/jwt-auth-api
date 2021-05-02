const Joi = require('joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({ 
        password: Joi.string().min(5).required(),
        repeat_password: Joi.ref('password'),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email()
    });

    return schema.validate(data);  
    
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schema.validate(data);
}
 
module.exports = {
    registerValidation,
    loginValidation
};



