const getDB = require('../../database/db');

const exerciseFilter = async(req, res) => {
    try {
        const connect = await getDB();

        await connect.query(
            `
              USE gym;
            `
          );

        const { typology, muscleGroup }= req.params;

        const [typeMus] = await connect.query(
            `
                SELECT exercise_name
                FROM exercises
                WHERE typology=? AND muscle_group=?
            `,[typology, muscleGroup]
        );

        if(typeMus.length === 0) return res.status(401).send('No se encontraron ejercicios con este filtrado.');

        connect.release();

        res.status(200).send({
            status: 'OK',
            data: typeMus
        });

    } catch (error) {
        console.error(error);
    }
}

module.exports = exerciseFilter;