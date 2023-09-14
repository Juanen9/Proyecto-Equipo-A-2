const getDB = require("../../database/db");

// Permite al usuario añadir un `like`a un ejercicio \\

const addLike = async (req, res) => {

  let connect;
  try {
    connect = await getDB();

    await connect.query(
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

    const [like] = await connect.query(
      `
          INSERT INTO likes(id_user, id_exercise) 
          VALUES (?,?)
        `,
      [idUser, idExercise]
    );

    await connect.query(
      `
        UPDATE exercises
        SET liked=1 
        WHERE id=?
      `,[idExercise]
    )


    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Like añadido",
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = addLike;
