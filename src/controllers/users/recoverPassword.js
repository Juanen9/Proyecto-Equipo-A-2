const getDB = require("../../database/db");
const { v4: uuidv4 } = require("uuid");
const sendmail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Envia un código de validación al correo para un cambio de contraseña \\

const recoverPassword = async (req, res) => {
  try {
    const connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );

    const { email } = req.body;

    const schema = joi.object().keys({
      email: joi.string().email().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      res.status(400).send(validation.error.message);
    }

    if (!email)
      return res
        .status(400)
        .send("Debe ingresar email para recuperar la contraseña.");

    const [user] = await connect.query(
      `
                SELECT id
                FROM users
                WHERE email=?
            `,
      [email]
    );

    if (user.length === 0)
      return res
        .status(404)
        .send("No existe un usuario con ese correo electrónico.");

    const recoverCode = uuidv4();

    await connect.query(
      `
                UPDATE users
                SET recoverCode=?, last_auth_updated=?
                WHERE email=?
            `,
      [recoverCode, new Date(), email]
    );

    const body = `
        Se solicitó un cambio de password de la cuenta del gimnasio del Equipo A.
        El codigo de recuperación es "${recoverCode}".
        `;

    const subject = `Cambio de contraseña de la cuenta del gimnasio del Equipo A.`;

    await sendmail(email, subject, body);

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Código de recuperación enviado.",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = recoverPassword;
