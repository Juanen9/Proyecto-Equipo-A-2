const getDB = require("../../database/db");

// Se envia el correo para activar el usuario junto con el código de regristro (regCode), al clickar en el enlace que nos proporciona el correo se valida el usuario \\

const activateUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { regCode } = req.params;

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [user] = await connect.query(
      `
                SELECT id
                FROM users
                WHERE regCode=?
            `,
      [regCode]
    );

    if (user.length === 0) {
      res.status(401).json({message: "No se encontró a ningún usuario con ese código de registro"});
    }
      


    await connect.query(
      `
                UPDATE users
                SET active=true, regCode=null
                WHERE regCode=?
            `,
      [regCode]
    );

    res.status(200).send({
      status: "OK",
      message: "Usuario validado correctamente"
    });

  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = activateUser;
