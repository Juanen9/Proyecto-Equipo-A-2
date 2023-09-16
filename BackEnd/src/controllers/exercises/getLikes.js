const getDB = require('../../database/db');

//Permite al usuario logueado consultar que ejercicios tiene como likes.

const getLikes = async(req, res) => {
    let connect;
    const idUser = req.userInfo.id
    try {
        connect = await getDB();

        await connect.query(
            `
                    USE gym;
                  `
          );

        const [like] = await connect.query(
            `
                SELECT *
                FROM likes WHERE id_user=?
            `,
            [idUser]
        );

        if(like.length === 0) return res.status(404).json('No se encontraron ejercicios en el apartado likes.');

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: like
        });
    } catch (error) {
        console.error(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
};

module.exports = getLikes;