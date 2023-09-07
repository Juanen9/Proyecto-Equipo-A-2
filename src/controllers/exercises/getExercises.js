const getDB = require("../../database/db");

// Lista todos los nombres de los ejercicios que hay dentro de la BD \\

const getExercises = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [names] = await connect.query(
      `
                SELECT *
                FROM exercises   `
    );

    if (!names) return res.status(401).send("No se encontró ningún ejercicio.");

    connect.release();

    res.status(200).send({
      status: "OK",
      data: names,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = getExercises;
