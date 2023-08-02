
const getDB = require('../../database/db');

const deleteExercise = async(req, res) => {
    try {
        const connect = await getDB();

        const {idExercise} = req.params;

        await connect.query(
            `
              USE gym;
            `
          );

        if(req.userInfo.role !== "admin")return res.status(401).send('Los entrenamientos solo pueden ser eliminados por el usuario administrador.');
        
        if(!idExercise) return res.status(400).send('Es necesario indicar el id del entrenamiento a eliminar.');

        const [id] = await connect.query(
            `
                SELECT id
                FROM exercises
                WHERE id=?
            `,[idExercise]
        );

        if(id.length === 0) return res.status(400).send('No existe ese ID en la tabla exercises.');

        const [deleteTrainExer] = await connect.query(
            `
                DELETE 
                FROM training_exercise 
                WHERE id_exercise=?
            `,[idExercise]
        )

        const [deleteExer] = await connect.query(
            `
                DELETE 
                FROM exercises 
                WHERE id=?
            `,[idExercise]
        )


        connect.release();
        res.status(200).send('Ejercicio borrado');
    } catch (error) {
        console.error(error);
    }
}

module.exports = deleteExercise;