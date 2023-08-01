const { token } = require("morgan");
const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const connect = await getDB();

    const auth = req.headers["auth"];
    

    if (!auth) return res.status(401).send("Falta cabecera de autorización.");

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(auth, process.env.SECRET_TOKEN);
    } catch (error) {
      return res.status(401).send("Token no válido.");
    }


    try {
      const validationToken = await connect.query(
        `
          SELECT token
          FROM users
          WHERE id=?
        `,[tokenInfo.id]
      )
      
      if(validationToken[0][0].token !== auth) res.status(400).send('Toquen caducado');

    } catch (error) {
      console.error(error);
    }

    const [user] = await connect.query(
      `
                SELECT last_auth_updated
                FROM users
                WHERE id=?
            `,
      [tokenInfo.id]
    );

    const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
    const timeStampCreateToken = new Date(tokenInfo.iat * 1000);

    if (timeStampCreateToken < lastAuthUpdate) {
      res.status(401).send("Token caducado");
    }
    req.userInfo = tokenInfo;

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = verifyToken;
