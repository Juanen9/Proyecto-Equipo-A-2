const getDB = require("../../database/db");

// Permite que los usuarios con el rol "admin" puedan borrar ejercicios de la BD, también desaparecen de los entrenamientos en los que estén añadidos \\
const deleteExercise = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { idExercise } = req.params;

    await connect.query(
      `
              USE gym;
            `
    );

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .send(
          "Los entrenamientos solo pueden ser eliminados por el usuario administrador."
        );

    if (!idExercise)
      return res
        .status(400)
        .send("Es necesario indicar el id del entrenamiento a eliminar.");

    const [id] = await connect.query(
      `
                SELECT id
                FROM exercises
                WHERE id=?
            `,
      [idExercise]
    );

    if (id.length === 0)
      return res.status(400).send("No existe ese ID en la tabla exercises.");

    const [deleteTrainExer] = await connect.query(
      `
                DELETE 
                FROM training_exercise 
                WHERE id_exercise=?
            `,
      [idExercise]
    );

    const [deleteLikeExer] = await connect.query(
      `
                DELETE 
                FROM likes 
                WHERE id_exercise=?
            `,
      [idExercise]
    );

    const [deleteFavExer] = await connect.query(
      `
                DELETE 
                FROM favs 
                WHERE id_exercise=?
            `,
      [idExercise]
    );


    const [deleteExer] = await connect.query(
      `
                DELETE 
                FROM exercises 
                WHERE id=?
            `,
      [idExercise]
    );

    connect.release();
    res.status(200).send("Ejercicio borrado");
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = deleteExercise;
