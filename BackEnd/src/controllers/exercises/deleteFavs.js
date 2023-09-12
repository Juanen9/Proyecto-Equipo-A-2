const getDB = require("../../database/db");

// Permite al usuario eliminar un `like`a un ejercicio \\

const deleteFavs = async (req, res) => {
  let connect;
  try {
    connect = await getDB();
    const [database] = await connect.query(
      `
            USE gym;
            `
    );
    const idUser = req.userInfo.id;
    const { idExercise } = req.params;

    const [exerciseName] = await connect.query(
      `
          SELECT exercise_name
          FROM exercises 
          WHERE id=?
        `,
      [idExercise]
    );

    if (exerciseName.length === 0)
      return res.status(404).send("Ejercicio no encontrado");

    const [deletefav] = await connect.query(
      `
        DELETE 
        FROM favs 
        WHERE id_user=? AND id_exercise=?
    `,
      [idUser, idExercise]
    );

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Ejercicio favorito eliminado",
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = deleteFavs;
