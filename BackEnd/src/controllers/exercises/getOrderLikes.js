const getDB = require("../../database/db");

// Lista los 3 ejercicios con mas likes \\

const getOrderLikes = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [likes] = await connect.query(
      `
            SELECT exercises.id, count(id_exercise) AS likes, exercise_name, photo
            FROM likes, exercises
            WHERE id_exercise = exercises.id
            GROUP BY id_exercise
            ORDER BY likes DESC
            LIMIT 3
            `
    );

    if (!likes) return res.status(401).send("No se encontró ningún ejercicio.");

    connect.release();

    res.status(200).send({
      status: "OK",
      data: likes,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = getOrderLikes;
