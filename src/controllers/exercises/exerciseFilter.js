const getDB = require("../../database/db");
const http = require("http");
const queryString = require("querystring");

// Permite a los usuarios filtrar los ejercicios por grupo muscular y/o tipología \\

const exerciseFilter = async (req, res) => {
  try {
    const connect = await getDB();

    await connect.query(
      `
              USE gym;
            `
    );

    const typology = req.query.typology;
    const muscleGroup = req.query.muscleGroup;

    if (typology && muscleGroup) {
      const [typeMus] = await connect.query(
        `
                    SELECT exercise_name
                    FROM exercises
                    WHERE typology=? AND muscle_group=?
                `,
        [typology, muscleGroup]
      );

      if (typeMus.length === 0)
        return res
          .status(401)
          .send("No se encontraron ejercicios con este filtrado.");

      res.status(200).send({
        status: "OK",
        data: typeMus,
      });
    } else if (typology) {
      const [typeMus] = await connect.query(
        `
                    SELECT exercise_name
                    FROM exercises
                    WHERE typology=?
                `,
        [typology]
      );

      if (typeMus.length === 0)
        return res
          .status(401)
          .send("No se encontraron ejercicios con este filtrado.");

      res.status(200).send({
        status: "OK",
        data: typeMus,
      });
    } else if (muscleGroup) {
      const [typeMus] = await connect.query(
        `
                    SELECT exercise_name
                    FROM exercises
                    WHERE muscle_group=?
                `,
        [muscleGroup]
      );

      if (typeMus.length === 0)
        return res
          .status(401)
          .send("No se encontraron ejercicios con este filtrado.");

      res.status(200).send({
        status: "OK",
        data: typeMus,
      });
    }

    connect.release();
  } catch (error) {
    console.error(error);
  }
};

module.exports = exerciseFilter;
