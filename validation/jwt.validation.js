const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({
        type: "error",
        message: "Access Denied"
    });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            type: "error",
            message: "Invalid Token"
        });
    }
}
 
module.exports = {
    validateToken
};
