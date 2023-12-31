const getDB = require('../../database/db');

//Permite al usuario logueado consultar que ejercicios tiene como favoritos.

const getFav = async(req, res) => {
    let connect;
    const idUser = req.userInfo.id
    try {
        connect = await getDB();

        await connect.query(
            `
                    USE gym;
                  `
          );

        const [fav] = await connect.query(
            `
                SELECT *
                FROM exercises e
                INNER JOIN favs f
                ON f.id_exercise=e.id AND f.id_user=?
            `,
            [idUser]
        );

        if(fav.length === 0) return res.status(404).json('No se encontraron ejercicios en el apartado favoritos.');

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: fav
        });
    } catch (error) {
        console.error(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
};

module.exports = getFav;