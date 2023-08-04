const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Permite a los usuarios modificar su propio perfil (nombre, email, avatar y password) y a los "admin" modificar cualquiera \\

const modifyUser = async (req, res) => {
  try {
    const connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );

    const { idUser } = req.params;
    const { name, email, email2, pwd} = req.body;

    const schema = joi.object().keys({
      name: joi.string(),
      email: joi.string().email(),
    });

    const validation = schema.validate(req.body, { allowUnknown: true });
    if (validation.error) return res.status(400).send(validation.error.message);

    // const extensionImage = req.files.avatarUser.name.split(`.`)[1];
    // if (
    //   extensionImage !== `png` &&
    //   extensionImage !== `jpg` &&
    //   extensionImage !== `jpeg` &&
    //   extensionImage !== `gif`
    // ) {
    //   return res.status(404).send(`Formato de imagen no válido`);
    // }


    if (req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin")
      return res
        .status(401)
        .send("No tienes permisos para realizar esta modificación.");

    if (email !== email2)
      return res.status(404).send("Los correos no coinciden.");

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

    const modifyCode = uuidv4();

    if(name){
    const [userName] = await connect.query(
      `
                UPDATE users
                SET user_name=?
                WHERE id=?
            `,
      [name, idUser]
    );
    }

    if(email){
     [userEmail] = await connect.query(
      `
                UPDATE users
                SET email=?, regCode=?
                WHERE id=?
            `,
      [email, modifyCode, idUser]
    );
    }
    if(pwd){
    const [userPassword] = await connect.query(
      `
                UPDATE users
                SET password=SHA2(?,512), active=false, regCode=?
                WHERE id=?
            `,
      [pwd, modifyCode, idUser]
    );
    }

    if (req.files && req.files.avatarUser) {

      const extensionImage = req.files.avatarUser.name.split(`.`)[1];
    if (
      extensionImage !== `png` &&
      extensionImage !== `jpg` &&
      extensionImage !== `jpeg` &&
      extensionImage !== `gif`
    ) {
      return res.status(404).send(`Formato de imagen no válido`);
    }

      const avatarUser = await savePhoto(req.files.avatarUser, "/avatarUser");

      await connect.query(
        `
          UPDATE users
          SET avatar=?
          WHERE id=?
        `,[avatarUser, idUser]
      );
    };

    const [sendEmail] = await connect.query(
      `
        SELECT email
        from users
        WHERE id=?
      `,[idUser]
    )

    const bodyMail = `Acabas de modificar la password en tu cuenta del Gimnasio del Equipo-A.
    Pulsa el siguiente enlace para activar tu cuenta: ${process.env.PUBLIC_HOST}${modifyCode}`;

    const subject = `Correo de verificación de cuenta en el Gimnasio del Equipo-A tras cambio de password.`

    if (email || pwd) {
      // Solo si hay un nuevo correo electrónico y al menos una de las siguientes condiciones es verdadera: nombre o contraseña se han actualizado
      sendMail(sendEmail[0].email,  subject, bodyMail);
    }
    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Usuario modificado",
      //data: user,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = modifyUser;
