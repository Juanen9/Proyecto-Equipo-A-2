const { token } = require("morgan");
const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");


const checkTokenValidity = async (req, res) => {
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
        const ahora = Date.now();
        if (ahora > tokenInfo.exp){
          res.status(401).json({ data: false });
        }
        res.status(200).json({ data: true , ahora: ahora, info: tokenInfo});
      } catch (error) {
        res.status(401).json({ data: false });
      }
  
    } catch (error) {
      console.error(error);
    }finally{
      connect.release();
    }
    
  };
  
  module.exports = checkTokenValidity;