const getDB = require("../../database/db");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Permite que se creen usuarios con el rol administrador \\

const adminRegistration = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { name, email, pwd, clue,role } = req.body;

    const [database] = await connect.query(
      `
              USE gym;
            `
    );


    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
      clue: joi.string().required(),
      pwd: joi
        .string()
        .min(8)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.!@#$%^&*()-+=]).{8,}$"
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
      role: joi.string().required()
    });

    const validation = schema.validate(req.body, { allowUnknown: true });

    if (validation.error) return res.status(400).json(validation.error.message);

    if(clue !== process.env.clue) return res.status(404).json('Si desconoces la palabra clave no puedes obtener un usuario con permisos de administrador.');

    if (role !== "admin")
      return res.status(404).json("El role solo puede ser admin.");

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
          .json("Ya existe ese nombre de usuario.");

    const [userExists] = await connect.query(
      `
                SELECT id
                FROM users
                WHERE email=?
            `,
      [email]
    );
    
    if (userExists.length !== 0)
      return res
        .status(400)
        .json("El usuario con ese correo electrónico ya existe.");

    const regCode = uuidv4();

    const bodyMail = `Te acabas de registrar como usuario administrador en el Gimnasio del equipo A.
        Pulsa el siguiente enlace para que podamos activar tu cuenta de administrador ${process.env.PUBLIC_HOST}${regCode}.`;

    const subject = `Correo de verificación para usuario administrador.`;

    sendMail(email, subject, bodyMail);

    const [users] = await connect.query(
      `
                INSERT INTO users(user_name, email, password, regCode, role)
                VALUES(?,?,SHA2(?,512),?,?)
            `,
      [name, email, pwd, regCode, role]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Usuario administrador registrado correctamente.",
      data: users,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = adminRegistration;
