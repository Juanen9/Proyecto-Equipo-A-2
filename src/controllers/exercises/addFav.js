const getDB = require('../../database/db');

//Permite a un usuario agregar a favoritos ejercicios.

const addFav = async(req,res) => {
    let connect;
    try {
        connect = await getDB();
        await connect.query(
            `
                  USE gym;
                  `
          );

        const {idExercise} = req.params;
        

        const [exerciseName] = await connect.query(
            `
                SELECT exercise_name 
                FROM exercises
                WHERE id=?
            `,[idExercise]
        );

        if(!exerciseName.length) return res.status(200).send('No existe el ejercicio indicado.');

        const [select] = await connect.query(
            `
                SELECT *
                FROM favs
                WHERE id_user=? AND id_exercise=?
            `,[req.userInfo.id, idExercise]
        );

        if(select.length) return res.status(200).send('Este ejercicio ya está en tus favoritos.');

        const [fav] = await connect.query(
            `
                INSERT INTO favs(id_user, id_exercise)
                VALUES(?, ?)
            `,[req.userInfo.id, idExercise]
        );
        connect.release();
        parseInt(req.userInfo.id)
        res.status(200).send({
            status: 'OK',
            message: `Ejercicio ${exerciseName[0]["exercise_name"]} añadido a favoritos.`
        })
        console.log(fav);
    } catch (error) {
        console.error(error);
    }finally{
        if(connect){
            connect.release();
        }
    }
};

module.exports = addFav;