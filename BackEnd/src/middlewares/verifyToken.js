const { token } = require("morgan");
const getDB = require("../database/db");
const jwt = require("jsonwebtoken");

// Comprobamos que el token sea válido y lo usamos para validar el rol de los usuario \\
const verifyToken = async (req, res, next) => {
  let connect;
  try {
    connect = await getDB();

    await connect.query(
      `
      USE gym;
      `
    );

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
        `,
        [tokenInfo.id]
      );

      if (validationToken[0][0].token !== auth)
        return res.status(400).send("Token caducado");
    } catch (error) {
      console.error(error);
    }

    req.userInfo = tokenInfo;

    next();
  } catch (error) {
    console.error(error);
  }finally{
    connect.release();
  }
  
};

module.exports = verifyToken;
