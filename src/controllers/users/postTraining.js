const getDB = require('../../database/db');


const postTraining = async(req, res) => {
    try {
        const connect = await getDB();

        const {name, description} = req.body;

        if(!name || !description) return res.status(400).send('Es necesario cubrir todos los campos para subir un nuevo entrenamiento.');

        if(req.userInfo.role !== "admin") return res.status(401).send('Sólo el usuario administrador puede cargar nuevos entrenamientos.');

        const [training] = await connect.query(
            `
                INSERT INTO training(training_name, training_description, user_id)
                VALUES(?,?,?)
            `,[name,description, req.userInfo.id]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'Entrenamiento añadido correctamente',
            data: training
        })
    } catch (error) {
        console.error(error);
    }
};

module.exports = postTraining;