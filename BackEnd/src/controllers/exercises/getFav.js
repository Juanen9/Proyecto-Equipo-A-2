const getDB = require('../../database/db');

//Permite al usuario logueado consultar que ejercicios tiene como favoritos.

const getFav = async(req, res) => {
    let connect;
    try {
        connect = await getDB();

        await connect.query(
            `
                    USE gym;
                  `
          );

        const [fav] = await connect.query(
            `
                SELECT e.exercise_name
                FROM exercises e
                INNER JOIN favs f
                ON f.id_exercise=e.id
            `
        );

        if(fav.length === 0) return res.status(404).send('No se encontraron ejercicios en el apartado favoritos.');

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