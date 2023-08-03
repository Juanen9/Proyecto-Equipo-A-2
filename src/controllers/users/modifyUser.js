const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");

const modifyUser = async (req, res) => {
    try {
        const connect = await getDB();

        await connect.query(
            `
              USE gym;
            `
          );

        const {idUser} = req.params;
        const {name, email} = req.body;

        if(req.userInfo.id !== parseInt(idUser) && req.userInfo.role !== 'admin') return res.status(401).send('No tienes permisos para realizar esta modificación.');

        //Comprobamos que no se introduzcan emails duplicados, aunque ya no lo permite la base de datos al ser email de tipo UNIQUE.
        const [mail] = await connect.query(
            `
                SELECT email
                FROM users
                WHERE email=?
            `,[email]
        );
        
        if(mail.length > 0) return res.status(404).send('Este email ya está registrado.');

        const [user] = await connect.query(
            `
                UPDATE users
                SET user_name=?, email=?
                WHERE id=?
            `,[name, email, idUser]
        );

        if(req.files && req.files.avatarUser){
            const avatarUser = await savePhoto(req.files.avatarUser,'/avatarUser');
            
            await connect.query(
              `
                      UPDATE users
                      SET avatar=?
                      WHERE id=?
                  `,[avatarUser, idUser]
            );
          };

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Usuario modificado',
            data: user
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = modifyUser;