const getDB = require('../../database/db');

//Permite a un usuario agregar a favoritos ejercicios.

const addFav = async(req,res) => {
    try {
        const connect = await getDB();

        await connect.query(
            `
                  USE gym;
                  `
          );

        const {exerciseName} = req.params;

        const [exerciseId] = await connect.query(
            `
                SELECT id 
                FROM exercises
                WHERE exercise_name=?
            `,[exerciseName]
        );

        const [fav] = await connect.query(
            `
                INSERT INTO favs(id_user, id_exercise)
                VALUES(?, ?)
            `,[req.userInfo.id, exerciseId[0].id]
        );

        connect.release();parseInt(req.userInfo.id)
        res.status(200).send({
            status: 'OK',
            message: `Ejercicio ${exerciseName} añadido a favoritos.`
        })
    } catch (error) {
        console.error(error);
    }
};

module.exports = addFav;