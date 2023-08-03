const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Permite a los usuario modificar su propio perfil (nombre, email y avatar) y a los "admin" modificar cualquiera \\

const modifyUser = async (req, res) => {
  try {
    const connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );
    const schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string().email().required(),
    });

    const validation = schema.validate(req.body, { allowUnknown: true });
    if (validation.error) return res.status(400).send(validation.error.message);

    const extensionImage = req.files.avatarUser.name.split(`.`)[1];
    if (
      extensionImage !== `png` &&
      extensionImage !== `jpg` &&
      extensionImage !== `jpeg` &&
      extensionImage !== `gif`
    ) {
      return res.status(404).send(`Formato de imagen no válido`);
    }

    const { idUser } = req.params;
    const { name, email, email2 } = req.body;

    if (req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin")
      return res
        .status(401)
        .send("No tienes permisos para realizar esta modificación.");

    if (email !== email2)
      return res.status(404).send("Los correos no coinciden");

    //Comprobamos que no se introduzcan emails duplicados, aunque ya no lo permite la base de datos al ser email de tipo UNIQUE.
    const [mail] = await connect.query(
      `
                SELECT email
                FROM users
                WHERE email=?
            `,
      [email]
    );

    if (mail.length > 0)
      return res.status(404).send("Este email ya está registrado.");

    const [user] = await connect.query(
      `
                UPDATE users
                SET user_name=?, email=?
                WHERE id=?
            `,
      [name, email, idUser]
    );

    if (req.files && req.files.avatarUser) {
      const avatarUser = await savePhoto(req.files.avatarUser, "/avatarUser");

      await connect.query(
        `
                      UPDATE users
                      SET avatar=?
                      WHERE id=?
                  `,
        [avatarUser, idUser]
      );
    }

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Usuario modificado",
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = modifyUser;
