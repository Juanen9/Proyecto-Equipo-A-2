const getDB = require("../../database/db");

// Se envia el correo para activar el usuario junto con el código de regristro (regCode), al clickar en el enlace que nos proporciona el correo se valida el usuario \\

const activateEmail = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const { emailCode } = req.params;

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [user] = await connect.query(
      `
                SELECT id
                FROM users
                WHERE emailCode=?
            `,
      [emailCode]
    );


    const [mail2] = await connect.query(
        `
                  SELECT email2
                  FROM users
                  WHERE emailCode=?
              `,
        [emailCode]
      );


    if (user.length === 0)
      res
        .status(401)
        .json({message:"No se encontró a ningún usuario con ese código de email"});


    await connect.query(
      `
                UPDATE users
                SET active=true, emailCode=null, email=?, email2=null
                WHERE emailCode=?
            `,
      [mail2[0].email2, emailCode]
    );

    connect.release();

    res.status(200).json({
      status: "OK",
      message: "Usuario validado correctamente",
    });

  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
  
};

module.exports = activateEmail;
