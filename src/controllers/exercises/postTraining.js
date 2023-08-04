const getDB = require("../../database/db");
const joi = require("@hapi/joi");

// Permite crear entrenamiento agrupando ejercicios \\

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
      exercises: joi.array().items(joi.string()).min(1).required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) return res.status(400).send(validation.error.message);

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
      [name, description]
    );

    const [idTraining] = await connect.query(
      `
        SELECT id 
        FROM training 
        WHERE training_name=?
      `,
      [name]
    );

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
