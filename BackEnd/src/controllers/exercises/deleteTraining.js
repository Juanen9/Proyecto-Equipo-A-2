const getDB = require("../../database/db");

// Permite que los usuarios con el rol "admin" puedan borrar training de la BD \\
const deleteTraining = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { idTraining } = req.params;

    await connect.query(
      `
              USE gym;
            `
    );

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .send(
          "Los training solo pueden ser eliminados por el usuario administrador."
        );

    if (!idTraining)
      return res
        .status(400)
        .send("Es necesario indicar el id del training a eliminar.");

    const [id] = await connect.query(
      `
                SELECT id
                FROM training
                WHERE id=?
            `,
      [idTraining]
    );

    if (id.length === 0)
      return res.status(400).send("No existe ese ID en la tabla training.");

    const [deleteTrain] = await connect.query(
      `
                DELETE 
                FROM training_exercise 
                WHERE id_training=?
            `,
      [idTraining]
    );

    const [deleteEntrenamineto] = await connect.query(
      `
                DELETE 
                FROM training 
                WHERE id=?
            `,
      [idTraining]
    );

    connect.release();
    res.status(200).send("Entrenamiento borrado");
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = deleteTraining;
