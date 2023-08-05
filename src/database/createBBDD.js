const getDB = require("./db");

const createBBDD = async () => {
  try {
    const connect = await getDB();

    await connect.query(
      `
                CREATE DATABASE IF NOT EXISTS gym;
            `
    );
    console.log("Base de datos creada con éxito.");

    await connect.query(
      `
                USE gym;
            `
    );

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS users(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                user_name VARCHAR(50) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(200) NOT NULL,
                role ENUM('user','admin'),
                avatar VARCHAR (250),
                registration_date DATETIME,
                active TINYINT(1),
                regCode CHAR(36),
                recoverCODE CHAR (36),
                last_auth_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted TINYINT (1),
                token TEXT
            );
            `
    );
    console.log('Tabla "users" creada.');

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS exercises(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                exercise_name VARCHAR(100) NOT NULL,
                exercise_description TEXT NOT NULL,
                photo VARCHAR(250),
                typology VARCHAR(100) NOT NULL,
                muscle_group VARCHAR(100) NOT NULL
            );
            `
    );

    console.log('Tabla "exercises" creada.');

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS training (
        	    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                training_name VARCHAR(50) NOT NULL,
                training_description VARCHAR (500) NOT NULL,
    	        level ENUM ('easy','medium','hard')
            )
            `
    );

    console.log('Tabla "training" creada.');

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS training_exercise (
            	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                id_training INT UNSIGNED,
                id_exercise INT UNSIGNED,
                FOREIGN KEY (id_training) REFERENCES training(id),
                FOREIGN KEY (id_exercise) REFERENCES exercises(id)
            );
            `
    );

    console.log('Tabla "training_exercise" creada.');

    // await connect.query(
    //   `
    //         CREATE TABLE IF NOT EXISTS user_training (
    // 	        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    //             id_user INT UNSIGNED,
    //             id_training INT UNSIGNED,
    //             start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //             favourite TINYINT(1),
    //             FOREIGN KEY (id_user) REFERENCES users(id),
    //             FOREIGN KEY (id_training) REFERENCES training(id)
    //         );
    //         `
    // );

    // console.log('Tabla "user_training" creada.');

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS likes (
            	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                id_user INT UNSIGNED,
                id_exercise INT UNSIGNED,
                FOREIGN KEY (id_user) REFERENCES users(id),
                FOREIGN KEY (id_exercise) REFERENCES exercises(id)
            );
            `
    );

    console.log('Tabla "likes" creada.');

    await connect.query(
      `
            CREATE TABLE IF NOT EXISTS favs (
            	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                id_user INT UNSIGNED,
                id_exercise INT UNSIGNED,
                FOREIGN KEY (id_user) REFERENCES users(id),
                FOREIGN KEY (id_exercise) REFERENCES exercises(id)
            );
            `
    );

    console.log('Tabla "favs" creada.');

    connect.release();
  } catch (error) {
    console.error(error);
  }
};

module.exports = createBBDD;
