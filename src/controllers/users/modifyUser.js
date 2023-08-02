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