const getDB = require('../../database/db');


const getExercisesExtend = async(req, res) => {
    try {
        const connect = await getDB();

        await connect.query(
            `
              USE gym;
            `
          );

        const {idExercise} = req.params;

        const [exercises] = await connect.query(
            `
                SELECT *
                FROM exercises
                WHERE id=?
            `,[idExercise]
        );

        if(exercises.length === 0) return res.status(400).send('No existe ejercicio con ese ID.');

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: exercises
        });


    } catch (error) {
        console.error(error);
    }
};

module.exports = getExercisesExtend;