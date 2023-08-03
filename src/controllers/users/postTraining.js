const getDB = require("../../database/db");
const joi = require('@hapi/joi');


const postTraining = async (req, res) => {
  try {
    const connect = await getDB();
    
    await connect.query(
      `
        USE gym;
      `
    );

    const { name, description, exercises } = req.body;

    const schema = joi.object().keys({
      name: joi.string().required(),
      description: joi.string().required(),
      exercises: joi.array().items(joi.string()).required()
      });

    const validation = schema.validate(req.body);

    if(validation.error) return res.status(400).send(validation.error.message);
    

    // if (!name || !description || !exercises)
    //   return res
    //     .status(400)
    //     .send(
    //       "Es necesario cubrir todos los campos para subir un nuevo entrenamiento."
    //     );

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .send(
          "Sólo el usuario administrador puede cargar nuevos entrenamientos."
        );

    const [training] = await connect.query(
            `
                INSERT INTO training(training_name, training_description)
                VALUES(?,?)
            `,
      [name, description],
        
    );
    //Gardamos id da tabla training donde o nombre do entrenamiento e igual o nome que pasamos por body.
    const [idTraining] = await connect.query(
      `
        SELECT id 
        FROM training 
        WHERE training_name=?
      `,
      [name]
    );

    //Iteramos na tabla exercises
    for (const exerciseName of exercises) {
      const [idExercises] = await connect.query(
        `
        SELECT id 
        FROM exercises 
        WHERE exercise_name=?
      `,
        [exerciseName]
      );
      await connect.query(
        `
                INSERT INTO training_exercise(id_training, id_exercise)
                VALUES(?,?)
            `,
        [idTraining[0].id, idExercises[0].id]
      );
    }
    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Entrenamiento añadido correctamente",
      data: training,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = postTraining;
