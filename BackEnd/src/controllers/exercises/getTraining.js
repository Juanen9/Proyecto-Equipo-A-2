const getDB = require("../../database/db");

// Lista todos los nombres de los ejercicios que hay dentro de la BD \\

const getTraining = async (req, res) => {
  let connect;
  let idExercises = []
  try {
    connect = await getDB();

    const [database] = await connect.query(
      `
              USE gym;
            `
    );

    const [training] = await connect.query(
        `
            SELECT *
            FROM training
        `,
    );

    for ( let e = 0 ; e < training.length ; e++ ){
        const [trainingExercises] = await connect.query(
            `
                SELECT id_exercise
                FROM training_exercise WHERE id_training = ?
            `,[training[e].id]
        );
        idExercises.push(trainingExercises)
    }

    for (let i = 0 ; i < idExercises.length ; i++){
        training[i].exercise = [];
        for ( let a = 0 ; a < idExercises[i].length ; a++ ){
        const [exercises] = await connect.query(
            `
                SELECT *
                FROM exercises WHERE id = ?
            `,[idExercises[i][a].id_exercise]
        );
        training[i].exercise.push(...exercises)
    };
}


    if (!training) return res.status(401).send("No se encontró ningún entrenamiento.");
      
    connect.release();

    res.status(200).send({
      status: "OK",
      data: training,
    });
  } catch (error) {
    console.error(error);
  }finally{
    if(connect){
        connect.release();
    }
}
};

module.exports = getTraining;