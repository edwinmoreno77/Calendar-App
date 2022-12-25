const jwt = require('jsonwebtoken');


const generateJWT = (uid, name, email) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, email };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}