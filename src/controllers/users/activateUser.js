const getDB = require('../../database/db');

const activateUser = async (req,res) => {
    try {
        const connect = await getDB();
        const {regCode} = req.params;

        const [user] = await connect.query(
            `
                SELECT id
                FROM users
                WHERE regCode=?
            `,[regCode]
        );

        if(user.length === 0) res.status(401).send('No se encontró a ningún usuario con ese código de registro');
        
        await connect.query(
            `
                UPDATE users
                SET active=true, regCode=null
                WHERE regCode=?
            `,[regCode]
        );

        connect.release();

        res.status(200).send({
            status:'OK',
            message: 'Usuario validado correctamente'
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = activateUser;