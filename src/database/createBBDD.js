const getDB = require('./db');

const createBBDD = async () => {
    try {
        const connect = await getDB();

        await connect.query(
            `
                CREATE DATABASE IF NOT EXISTS gym;
            `
        );
        console.log('Base de datos creada con éxito.');

        await connect.query(
            `
                USE gym;
            `
        );

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS users(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                user_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL,
                role ENUM("admin", "anonimo") DEFAULT "anonimo" NOT NULL,
                registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                active BOOLEAN DEFAULT false,
                avatar VARCHAR(100),
                deleted BOOLEAN DEFAULT false,
                regCode CHAR(36),
                recover_Code CHAR(36),
                last_auth_update DATETIME
            );
            `
        );
        console.log('Tabla "users" creada.');

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS training(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                training_name VARCHAR(100) NOT NULL,
                training_description TEXT NOT NULL,
                start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                user_id INT UNSIGNED NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
            `
        );

        console.log('Tabla "training" creada.');

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS exercises(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                exercise_name VARCHAR(100) NOT NULL,
                exercise_description TEXT NOT NULL,
                photo VARCHAR(100),
                typology VARCHAR(100) NOT NULL,
                muscle_group VARCHAR(100) NOT NULL,
                likes BOOLEAN DEFAULT false,
                fav BOOLEAN DEFAULT false,
                training_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (training_id) REFERENCES training(id)
            );
            `
        );

        console.log('Tabla "exercises" creada.');

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS address(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                address VARCHAR(100) NOT NULL,
                country VARCHAR(100) NOT NULL,
                city VARCHAR(100) NOT NULL,
                cp VARCHAR(100) NOT NULL,
                user_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            `
        );

        console.log('Tabla "address" creada.');

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS muscle_group(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                muscle_name VARCHAR(100) NOT NULL,
                muscle_description TEXT NOT NULL,
                photo VARCHAR(100),
                exercise_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (exercise_id) REFERENCES exercises(id)
            );
            `
        );

        console.log('Tabla "muscle_group" creada.');

        await connect.query(
            `
            CREATE TABLE IF NOT EXISTS client_bank_info(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                account_number INT UNSIGNED NOT NULL,
                bank_name VARCHAR(100) NOT NULL,
                last_payment_date DATETIME NOT NULL,
                user_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            `
        );

        console.log('Tabla "client_bank_info" creada.');

        connect.release();
    } catch (error) {
        console.error(error);
    }
};

module.exports = createBBDD;