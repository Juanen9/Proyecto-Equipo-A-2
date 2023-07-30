const getDB = require('../../database/db');
const {v4: uuidv4} = require('uuid');
const sendMail = require('../../service/sendMail');


const userRegistration = async (req, res) => {
    try {
        const connect = await getDB();

        const {name, email, pwd} = req.body;

        if(!name || !email || !pwd) return res.status(400).send('Estos datos son necesarios para registrar un usuario.');

        const [userExists] = await connect.query(
            `
                SELECT id 
                FROM users
                WHERE email=?
            `,[email]
        );

        if(userExists.length > 0) return res.status(400).send({
            status: 'ERROR',
            message: 'El usuario con ese correo electrónico ya existe.'
        });

        //El código de registro generado por uuid que se asignará al usuario registrado.
        const regCode = uuidv4();

        //Construimos el cuerpo del email.
        const bodyMail = `
        Acabas de registrarte en el Gimnasio del equipo A.
        Pulsa el siguiente enlace para activar tu cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `
        //Construimos el asunto del correo.
        const subject = `Correo de verificación de cuenta en el Gimnasio del equipo A`

        //Enviamos el correo.
        sendMail(email, subject, bodyMail);

        const [user] = await connect.query(
            `
                INSERT INTO users(user_name, email, password, regCode)
                VALUES(?,?,SHA2(?,512),?)
            `,[name, email, pwd, regCode]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario registrado con éxito',
            data: user
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = userRegistration;