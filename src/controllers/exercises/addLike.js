const getDB = require("../../database/db");

// Permite al usuario añadir un `like`a un ejercicio \\

const addLike = async (req, res) => {
  try {
    const connect = await getDB();

    await connect.query(
      `
            USE gym;
            `
    );

    const idUser = req.userInfo.id;

    const { exerciseName } = req.params;

    const [idExercise] = await connect.query(
      `
          SELECT id 
          FROM exercises 
          WHERE exercise_name=?
        `,
      [exerciseName]
    );

    if (idExercise.length === 0)
      return res.status(404).send("Ejercicio no encontrado");

    const [like] = await connect.query(
      `
          INSERT INTO likes(id_user, id_exercise) 
          VALUES (?,?)
        `,
      [idUser, idExercise[0].id]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Like añadido",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = addLike;
