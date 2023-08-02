const getDB = require('../../database/db');
const savePhoto = require("../../service/savePhoto");


const modifyExercise = async(req, res) => {
    try {
        const connect = await getDB();

        const {idExercise} = req.params;
        const {exercise_name, exercise_description, typology, muscle_group} = req.body;


        await connect.query(
            `
              USE gym;
            `
          );

        if(req.userInfo.role !== "admin")return res.status(401).send('Los entrenamientos solo pueden ser modificados por el usuario administrador.');
        
        if(!idExercise) return res.status(400).send('Es necesario indicar el id del entrenamiento a modificar.');

        const [update] = await connect.query(
            `
                UPDATE exercises
                SET exercise_name=?, exercise_description=? , typology=? , muscle_group=?
                WHERE id=?
            `,[exercise_name, exercise_description, typology, muscle_group,idExercise]
        );

        if(req.files && req.files.exercisePhoto){
            const exercisePhoto = await savePhoto(req.files.exercisePhoto,'/exercisePhoto');

            await connect.query(
                `
                UPDATE exercises
                SET photo=?
                WHERE id=?
                `,[exercisePhoto, idExercise]
            )
        }

        connect.release();
        res.status(200).send('Ejercicio modificado');
    } catch (error) {
        console.error(error);
    }
}

module.exports = modifyExercise;