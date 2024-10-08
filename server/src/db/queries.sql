-- Run this script in MysqlServer after run the server.
CREATE DATABASE IF NOT EXISTS AlunethHandmade;

USE AlunethHandmade;

CREATE TABLE IF NOT EXISTS Persona (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    ci INT NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    nro_celular INT NOT NULL,
    rol VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Cuenta (
    id INT NOT NULL AUTO_INCREMENT,
    nro_cuenta INT NOT NULL,
    nombre_usuario VARCHAR(30) NOT NULL,
    contrasenia VARCHAR(35) NOT NULL,
    id_persona INT NULL,
    FOREIGN KEY (id_persona) REFERENCES Persona(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Pedido (
	id INT NOT NULL AUTO_INCREMENT,
    numero_pedido INT NOT NULL,
    fecha_pedido DATE NOT NULL,
    fecha_recojo DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    ci_destinatario INT NOT NULL,
    nombre_destinatario VARCHAR(30),
    total INT NOT NULL,
    id_persona INT NOT NULL,
    id_cuenta INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_persona) REFERENCES Persona(id),
    FOREIGN KEY (id_cuenta) REFERENCES Cuenta(id)
);

CREATE TABLE IF NOT EXISTS Cuaderno (
	id INT NOT NULL AUTO_INCREMENT,
    codigo_de_catalogo VARCHAR(10) NOT NULL,
    precio FLOAT NOT NULL,
    personalizado BOOLEAN NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    especificaciones VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Pedido_Cuaderno (
	id INT NOT NULL AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_cuaderno INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id),
    FOREIGN KEY (id_cuaderno) REFERENCES Cuaderno(id)
);