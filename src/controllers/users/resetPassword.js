const getDB = require("../../database/db");
const joi = require("@hapi/joi");

// Con el código enviado en recoverPassword.js, nos permite recuperar la contraseña \\

const resetPassword = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    await connect.query(
      `
              USE gym;
            `
    );
    const { recoverCode, newPassword } = req.body;

    const schema = joi.object().keys({
      recoverCode: joi.string().required,
      newPassword: joi
        .string()
        .min(8)
        .pattern(
          new RegExp(
            "^([a-z0-9A-ZÑ._~!@#$%^&*()-=+]+){8,20}$"
          )
        )
        .required()
        .messages({
          "string.base": "La contraseña debe ser una cadena",
          "string.empty": "La contraseña no debe estar vacía",
          "string.min": "La contraseña debe tener al menos {#limit} caracteres",
          "string.pattern.base":
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo",
          "any.required": "La contraseña es requerida",
        }),
    });

    const [idUser] = await connect.query(
      `
                SELECT id
                FROM users
                WHERE recoverCode=?
            `,
      [recoverCode]
    );

    if (idUser.length === 0)
      return res.status(400).send("Código de recuperación no válido.");

    await connect.query(
      `
                UPDATE users
                SET password=SHA2(?,512), last_auth_updated=?, recoverCode=null
                WHERE id=?
            `,
      [newPassword, new Date(), idUser[0].id]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Password actualizada con éxito.",
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = resetPassword;
