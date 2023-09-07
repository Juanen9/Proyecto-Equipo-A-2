const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");
const { v4: uuidv4 } = require("uuid");

// Permite a los usuario "admin" crear ejercicios \\

const postExercise = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { name, description, typology, muscleGroup } = req.body;

    const [database] = await connect.query(
      `
        USE gym;
      `
    );

    if (!name || !description || !typology || !muscleGroup)
      return res
        .status(400)
        .send(
          "Es necesario cubrir todos los campos para subir un nuevo ejercicio."
        );

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .send("Sólo el usuario administrador puede cargar nuevos ejercicios.");

    const extensionImage = req.files.exercisePhoto.name.split(`.`)[1];
    if (
      extensionImage !== `png` &&
      extensionImage !== `jpg` &&
      extensionImage !== `jpeg` &&
      extensionImage !== `gif`
    ) {
      return res.status(404).send(`Formato de imagen no válido`);
    }

    if (req.files && req.files.exercisePhoto) {
      const exercisePhoto = await savePhoto(
        req.files.exercisePhoto,
        "/exercisePhoto"
      );

      await connect.query(
        `
                INSERT INTO exercises(exercise_name, exercise_description, photo,typology, muscle_group)
                VALUES(?,?,?,?,?)
            `,
        [name, description, exercisePhoto, typology, muscleGroup]
      );
    }

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Ejercicio añadido correctamente",
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = postExercise;
