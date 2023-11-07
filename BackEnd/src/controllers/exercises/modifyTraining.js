const getDB = require("../../database/db");

// Permite a los usuario con rol "admin" modificar entrenamientos \\

const modifyTraining = async (req, res) => {

  let connect;
  let exercisesArray = [];
  let exercisesArrayDos = [];

  try {
    connect = await getDB();

    const { idTraining } = req.params;
    const { training_name, training_description, newExercisesArray} = req.body;

    await connect.query(
      `
              USE gym;
            `
    );

    if (!training_name || !training_description) return res.status(404).json({message: 'Es necesario introducir todos los campos para modificar un entrenamiento.'});
    

    if (req.userInfo.role !== "admin")
      return res
        .status(401)
        .json(
          {message: "Los entrenamientos solo pueden ser modificados por el usuario administrador."}
        );

    if (!idTraining)
      return res
        .status(400)
        .json({message: "Es necesario indicar el id del entrenamiento a modificar."});

    const [exercises] = await connect.query(
        `
            SELECT id_exercise
            FROM training_exercise
            WHERE id_training=?
              `,
        [idTraining]
      );
      
      for (let i = 0; i < exercises.length; i++) {
        exercisesArray.push(exercises[i]["id_exercise"]);
    }
    
    exercisesArrayDos = newExercisesArray.split(",").map((e)=>+e);

    const exerciseDelete = exercisesArray.filter(element => !exercisesArrayDos.includes(element));
 
    const exercisesAdd = exercisesArrayDos.filter(element => !exercisesArray.includes(element))

    const [update] = await connect.query(
      `
                UPDATE training
                SET training_name=?, training_description=?
                WHERE id=?
            `,
      [training_name, training_description, idTraining]
    );

  if(exercisesAdd.length > 0){

    for (const exerciseId of exercisesAdd ){

      const [updateAddExercises] = await connect.query(
        `
        INSERT INTO training_exercise(id_training, id_exercise)
        VALUES(?,?)
              `,
        [idTraining, exerciseId]
      );
    }
  }


  if(exerciseDelete.length > 0 ){
    for (const exerciseId of exerciseDelete ){

      const [updateDeleteExercises] = await connect.query(
        `
        DELETE 
        FROM training_exercise 
        WHERE id_training=? AND id_exercise=?
              `,
        [idTraining, exerciseId]
      );
    }
  }
    
    connect.release();
    res.status(200).json({message: exercisesAdd});
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = modifyTraining;
