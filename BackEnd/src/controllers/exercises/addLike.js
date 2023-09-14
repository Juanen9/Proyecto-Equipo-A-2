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
      return res.status(404).json({message: "Ejercicio no encontrado"});

      const [exerciseLiked] = await connect.query(
        `
            SELECT *
            FROM likes 
            WHERE id_user=? AND id_exercise=?
          `, 
          [idUser, idExercise]
      );
      
      if(!exerciseLiked.length === 0)
      return res.status(403).json({message: "Ejercicio ya tiene un like"});

    const [like] = await connect.query(
      `
          INSERT INTO likes(id_user, id_exercise) 
          VALUES (?,?)
        `,
      [idUser, idExercise]
    );

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
