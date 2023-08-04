const getDB = require("../../database/db");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Permite la creación de usuarios \\

const userRegistration = async (req, res) => {
  try {
    const connect = await getDB();

    const { name, email, pwd } = req.body;

    await connect.query(
      `
        USE gym;
      `
    );

    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
      pwd: joi
        .string()
        .min(8)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
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

    const validation = schema.validate(req.body);

    if (validation.error) return res.status(400).send(validation.error.message);

    const [nameExists] = await connect.query(
      `
      SELECT id
      FROM users
      WHERE user_name=?
      `,[name]
    );
    if (nameExists.length !== 0)
      return res
        .status(400)
        .send("Ya existe ese nombre de usuario.");

    const [userExists] = await connect.query(
      `
                SELECT id 
                FROM users
                WHERE email=?
            `,
      [email]
    );

    if (userExists.length > 0)
      return res.status(400).send({
        status: "ERROR",
        message: "El usuario con ese correo electrónico ya existe.",
      });

    const regCode = uuidv4();

    const bodyMail = `
        Acabas de registrarte en el Gimnasio del equipo A.
        Pulsa el siguiente enlace para activar tu cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `;

    const subject = `Correo de verificación de cuenta en el Gimnasio del equipo A`;

    sendMail(email, subject, bodyMail);

    const [user] = await connect.query(
      `
                INSERT INTO users(user_name, email, password, regCode, role)
                VALUES(?,?,SHA2(?,512),?,?)
            `,
      [name, email, pwd, regCode, "user"]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Usuario registrado con éxito",
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = userRegistration;
