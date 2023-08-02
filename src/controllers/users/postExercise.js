const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");
const {v4: uuidv4} = require("uuid");

const postExercise = async (req, res) => {
  try {
    const connect = await getDB();

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

    if(req.files && req.files.exercisePhoto){
      const exercisePhoto = await savePhoto(req.files.exercisePhoto,'/exercisePhoto');
            
      await connect.query(
        `
                INSERT INTO exercises(exercise_name, exercise_description, photo,typology, muscle_group)
                VALUES(?,?,?,?,?)
            `,
      [name, description, exercisePhoto, typology, muscleGroup]
      );
    };

    connect.release();

    res.status(200).send({
      status: "OK",
      message: "Ejercicio añadido correctamente",
      
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = postExercise;
