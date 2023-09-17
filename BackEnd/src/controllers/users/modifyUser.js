const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../service/sendMail");
const joi = require("@hapi/joi");

// Permite a los usuarios modificar su propio perfil (nombre, email, avatar y password) y a los "admin" modificar cualquiera \\

const modifyUser = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );

    const { idUser } = req.params;
    const { name, email, email2, pwd, pwd2, pwd3} = req.body;

    const schema = joi.object().keys({
      name: joi.string(),
      email: joi.string().email(),
      pwd: joi
        .string()
        .min(8)
        .required()
        .pattern(
          new RegExp(
            "^([a-z0-9A-ZÑ._~!@#$%^&*()-=+]+){8,20}$"

          )
        )
        .messages({
          "string.base": "La contraseña debe ser una cadena",
          "string.empty": "La contraseña no debe estar vacía",
          "string.min": "La contraseña debe tener al menos {#limit} caracteres",
          "string.pattern.base":
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo",
          "any.required": "La contraseña es requerida",
        }),
        pwd2: joi
        .string()
        .min(8)
        .pattern(
          new RegExp(
            "^([a-z0-9A-ZÑ._~!@#$%^&*()-=+]+){8,20}$"

          )
        )
        .messages({
          "string.base": "La contraseña debe ser una cadena",
          "string.empty": "La contraseña no debe estar vacía",
          "string.min": "La contraseña debe tener al menos {#limit} caracteres",
          "string.pattern.base":
            "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un símbolo",
          "any.required": "La contraseña es requerida",
        })
    });

    const [pass] = await connect.query(
      `
        SELECT id
        FROM users
        WHERE password=SHA2(?,512)
      `,[pwd]
    );
    
    if(idUser != pass[0]?.id) return res.status(401).json({message: "La contraseña no es válida."}) 


    const validation = schema.validate(req.body, { allowUnknown: true });
    if (validation.error) return res.status(400).json({message: validation.error.message});

    const [id] = await connect.query(
      `
        SELECT id
        FROM users
        WHERE id=?
      `,[idUser]
    );
    if(!id.length) return res.status(400).json({message: "No existe en la base de datos un usuario con ese id."})


    if (req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== "admin")
      return res
        .status(401)
        .json({message: "No tienes permisos para realizar esta modificación."});

    if (req.files && req.files.avatarUser) {

      const extensionImage = req.files.avatarUser.name.split(`.`)[1];
    if (
      extensionImage !== `png` &&
      extensionImage !== `jpg` &&
      extensionImage !== `jpeg` &&
      extensionImage !== `gif`
    ) {
      return res.status(404).json({message: "Formato de imagen no válido"});
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

    if (email !== email2)
      return res.status(404).json({message: "Los correos no coinciden."});

    const [mail] = await connect.query(
      `
                SELECT email
                FROM users
                WHERE email=?
            `,
      [email]
    );

    if (mail.length > 0)
      return res.status(404).json({message: "Este email ya está registrado."});

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
    if(pwd2){
      if(pwd2 === pwd) return res.status(401).json({message: "La contraseña no puede ser igual a la contraseña antigua."});
      if(pwd2 != pwd3) return res.status(401).json({message: "No coinciden las contraseñas"});
    const [userPassword] = await connect.query(
      `
                UPDATE users
                SET password=SHA2(?,512), active=false, regCode=?
                WHERE id=?
            `,
      [pwd2, modifyCode, idUser]
    );
    }

    

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

    if (email || pwd2) {
      // Solo si hay un nuevo correo electrónico y al menos una de las siguientes condiciones es verdadera: nombre o contraseña se han actualizado
      const [active] = await connect.query(
        `
          UPDATE users
          SET active = 0
          WHERE id=?
        `,[idUser]
      )
      sendMail(sendEmail[0].email,  subject, bodyMail);
    }
    connect.release();

    res.status(200).json({
      status: "OK",
      message: "Usuario modificado",
      //data: user,
    });
  } catch (error) {
    console.error(error);
    
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = modifyUser;
