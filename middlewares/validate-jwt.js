const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {
    //read token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        });
    }
    try {
        const { uid, name, email } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
        req.email = email;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'El token no es válido'
        });
    }
    next();
}

module.exports = {
    validateJWT
}