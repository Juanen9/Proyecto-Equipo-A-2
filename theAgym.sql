CREATE DATABASE theAgym;
USE theAgym;
CREATE TABLE IF NOT EXISTS users
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password CHAR(16) NOT NULL,
    role ENUM('user','admin'),
    avatar VARCHAR (100),
    registration_date DATETIME,
    active TINYINT(1),
    regCode CHAR(36),
    recoverCODE CHAR (36),
    last_auth_updated DATETIME,
    deleted TINYINT (1)
);

CREATE TABLE IF NOT EXISTS exercises 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    exercise_name VARCHAR(50) NOT NULL,
    description VARCHAR (500) NOT NULL,
    foto VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS muscle_group 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    mg_name VARCHAR(50) NOT NULL UNIQUE,
    foto VARCHAR (100)
);

CREATE TABLE IF NOT EXISTS exer_muscle_group 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_exercise INT UNSIGNED,
    id_muscle_group INT UNSIGNED,
    FOREIGN KEY (id_exercise) REFERENCES exercises(id),
    FOREIGN KEY (id_muscle_group) REFERENCES muscle_group(id)
);

CREATE TABLE IF NOT EXISTS training 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    training_name VARCHAR(50) NOT NULL,
    description VARCHAR (500) NOT NULL,
	level ENUM ('easy','medium','hard')
);

CREATE TABLE IF NOT EXISTS training_exercise 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_training INT UNSIGNED,
    id_exercise INT UNSIGNED,
    FOREIGN KEY (id_training) REFERENCES training(id),
    FOREIGN KEY (id_exercise) REFERENCES exercises(id)
);

CREATE TABLE IF NOT EXISTS user_training 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
    id_training INT UNSIGNED,
    start_date DATETIME,
    favourite TINYINT(1),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_training) REFERENCES training(id)
);

CREATE TABLE IF NOT EXISTS likes 
(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
    id_exercise INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_exercise) REFERENCES exercises(id)
);