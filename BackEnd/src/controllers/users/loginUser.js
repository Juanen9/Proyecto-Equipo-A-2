const getDB = require("../../database/db");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

// Permite al usuario registrado iniciar sesión generando un token \\

const loginUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { email, pwd } = req.body;

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const schema = joi.object().keys({
      email: joi.string().email().required(),
      pwd: joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) return res.status(400).send(validation.error.message);

    const [user] = await connect.query(
      `
                SELECT id, role, active
                from users
                WHERE email=? AND password=SHA2(?,512)
            `,
      [email, pwd]
    );

    if (user.length === 0)
      return res.status(404).json({message: "Usuario o contraseña incorrectos."});
    if (user[0].active !== 1)
      return res
        .status(404)
        .json({message: "El usuario no se encuentra registrado/activado."});


    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + 1 * 30; 

    
    const info = {
      id: user[0].id,
      role: user[0].role,
      iat: currentTimestamp,
      exp: expirationTimestamp,
    };

  
    const token = jwt.sign(info, process.env.SECRET_TOKEN);

    
    const [insertToken] = await connect.query(
      `
                UPDATE users 
                SET token=?
                WHERE email=?
            `,
      [token, email]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Login",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = loginUser;
