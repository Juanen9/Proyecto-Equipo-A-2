const getDB = require('../database/db');
const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    try {
        const connect = await getDB();

        const auth = req.headers['auth'];

        if(!auth) return res.status(401).send('Falta cabecera de autorización.');

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(auth, process.env.SECRET_TOKEN);
        } catch (error) {
            return res.status(401).send('Token no válido.');
        }

        req.userInfo = tokenInfo;

        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = verifyToken;