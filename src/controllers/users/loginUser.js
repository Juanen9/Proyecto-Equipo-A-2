const getDB = require('../../database/db');
const jwt = require('jsonwebtoken');

const loginUser = async(req,res) => {
    try {
        const connect = await getDB();

        const {email, pwd} = req.body;

        if(!email || !pwd) return res.status(400).send('Los campos son necesarios para iniciar sesión.');

        //Comprobamos que el usuario exista y la contraseña sea correcta.

        /*Quédame comprobar se o usuario está activo ou non, non sei se o farei con middlewares ou con if, creo que con middlewares */

        const [user] = await connect.query(
            `
                SELECT id, role, active
                from users
                WHERE email=? AND password=SHA2(?,512)
            `,[email, pwd]
        );

        if(user.length === 0) return res.status(404).send('Usuario o contraseña incorrectos.');
        if(user[0].active !== 1) return res.status(404).send('El usuario no se encuentra registrado/activado.');

        //jsonwebtoken
        //body de jwt

        const info = {
            id: user[0].id,
            role: user[0].role
        };

        //Generamos el token.

        const token = jwt.sign(info, process.env.SECRET_TOKEN, {expiresIn: '1d'});

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Login',
            data: {
                token: token
            }
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = loginUser;