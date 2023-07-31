const getDB = require('../../database/db');
const {v4: uuidv4} = require('uuid');
const sendMail = require('../../service/sendMail');


const adminRegistration = async(req, res) => {
    try {
        const connect = await getDB();

        const {name, email, pwd, role} = req.body;

        if(!email || !pwd || !role) return res.status(400).send('Hai que cubrir todos los datos para dar de alta un usuario administrador.');

        const [userExists] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE email=?
            `,[email]
        );

        if(userExists.length > 0) return res.send(400).send('El usuario con ese correo electrónico ya existe.');

        const regCode = uuidv4();

        const bodyMail = `Te acabas de registrar como usuario administrador en el Gimnasio del equipo A.
        Pulsa el siguiente enlace para que podamos activar tu cuenta de administrador ${process.env.PUBLIC_HOST}${regCode}.`

        const subject = `Correo de verificación para usuario administrador.`

        sendMail(email, subject, bodyMail);

        const [users] = await connect.query(
            `
                INSERT INTO users(user_name, email, password, regCode, role)
                VALUES(?,?,SHA2(?,512),?,?)
            `,[name, email, pwd, regCode, role]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario administrador registrado correctamente.',
            data: users
        });

    } catch (error) {
        console.error(error);
    }
}

module.exports = adminRegistration;