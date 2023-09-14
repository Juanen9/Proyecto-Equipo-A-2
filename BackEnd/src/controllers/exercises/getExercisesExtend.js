const getDB = require("../../database/db");

// Proporciona toda la información sobre un ejercicio en concreto \\

const getExercisesExtend = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );

    const { idExercise } = req.params;

    const [exercises] = await connect.query(
      `
                SELECT *
                FROM exercises
                WHERE id=?
            `,
      [idExercise]
    );

    if (exercises.length === 0)
      return res.status(400).send("No existe ejercicio con ese ID.");

    connect.release();

    res.status(200).send({
      status: "OK",
      data: exercises,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = getExercisesExtend;
