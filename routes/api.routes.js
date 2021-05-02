const api = require('../api/Users.js');
const router = require('express').Router();

const  { validateToken }  = require('../validation/jwt.validation.js');
 
router.post('/register', api.registerUser);
router.post('/login', api.loginUser);
router.get('/all', validateToken, api.getUsers);


module.exports = router;