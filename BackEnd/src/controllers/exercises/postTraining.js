const getDB = require("../../database/db");
const joi = require("@hapi/joi");

// Permite crear entrenamiento agrupando ejercicios \\

const postTraining = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    await connect.query(
      `
        USE gym;
      `
    );

    const { name, description, exercises } = req.body;

    const schema = joi.object().keys({
      name: joi.string().required(),
      description: joi.string().required(),
      exercises: joi.array().items(joi.number()).min(1).required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) return res.status(400).json(validation.error.message);

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .json(
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

    for (const exerciseId of exercises) {
      const [idExercises] = await connect.query(
        `
        SELECT exercise_name
        FROM exercises 
        WHERE id=?
      `,
        [exerciseId]
      );
      await connect.query(
        `
                INSERT INTO training_exercise(id_training, id_exercise)
                VALUES(?,?)
            `,
        [idTraining[0].id, idExercises[0].id]
        
      );
      console.log();
    }
    connect.release(idTraining[0].id);

    res.status(200).json({
      status: "OK",
      message: "Entrenamiento añadido correctamente",
      data: training,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = postTraining;
