const getDB = require("../../database/db");

const postExercise = async (req, res) => {
  try {
    const connect = await getDB();

    const { name, description, photo, typology, muscleGroup } = req.body;

    if (!name || !description || !photo || !typology || !muscleGroup)
      return res
        .status(400)
        .send(
          "Es necesario cubrir todos los campos para subir un nuevo ejercicio."
        );

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .send("Sólo el usuario administrador puede cargar nuevos ejercicios.");

    const [exercise] = await connect.query(
      `
                INSERT INTO exercises(exercise_name, exercise_description, photo, typology, muscle_group)
                VALUES(?,?,?,?,?)
            `,
      [name, description, photo, typology, muscleGroup]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Ejercicio añadido correctamente",
      data: exercise,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = postExercise;
