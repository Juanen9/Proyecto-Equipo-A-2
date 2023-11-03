const getDB = require("../../database/db");
const savePhoto = require("../../service/savePhoto");

// Permite a los usuario con rol "admin" modificar ejercicios \\

const modifyExercise = async (req, res) => {
  let connect;
  try {
    connect = await getDB();

    const { idExercise } = req.params;
    const { exercise_name, exercise_description, typology, muscle_group } =
      req.body;

    await connect.query(
      `
              USE gym;
            `
    );

    if (!exercise_name || !exercise_description || !typology || !muscle_group) return res.status(404).json({message: 'Es necesario introducir todos los campos para modificar los ejercicios.'});
    

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .json(
          {message: "Los entrenamientos solo pueden ser modificados por el usuario administrador."}
        );

    if (!idExercise)
      return res
        .status(400)
        .json({message: "Es necesario indicar el id del entrenamiento a modificar."});

    const [update] = await connect.query(
      `
                UPDATE exercises
                SET exercise_name=?, exercise_description=? , typology=? , muscle_group=?
                WHERE id=?
            `,
      [exercise_name, exercise_description, typology, muscle_group, idExercise]
    );
    

    if (req.files && req.files.exercisePhoto) {
      const extensionImage = req.files.exercisePhoto.name.split(`.`)[1];
      if (
        extensionImage !== `png` &&
        extensionImage !== `jpg` &&
        extensionImage !== `jpeg` &&
        extensionImage !== `gif`
      ) {
        return res.status(404).json({message: `Formato de imagen no válido`});
      }
      const exercisePhoto = await savePhoto(
        req.files.exercisePhoto,
        "/exercisePhoto"
      );

      await connect.query(
        `
                UPDATE exercises
                SET photo=?
                WHERE id=?
                `,
        [exercisePhoto, idExercise]
      );
    }

    connect.release();
    res.status(200).json({message: "Ejercicio modificado"});
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = modifyExercise;
