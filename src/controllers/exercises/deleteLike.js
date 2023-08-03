const getDB = require("../../database/db");

// Permite al usuario eliminar un `like`a un ejercicio \\

const deleteLike = async (req, res) => {
  try {
    const connect = await getDB();
    const [database] = await connect.query(
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

    const [deletelike] = await connect.query(
      `
        DELETE 
        FROM likes 
        WHERE id_user=? AND id_exercise=?
    `,
      [idUser, idExercise[0].id]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Like eliminado",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = deleteLike;
