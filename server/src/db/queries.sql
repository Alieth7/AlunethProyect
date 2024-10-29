-- Run this script in MysqlServer after run the server.
CREATE DATABASE IF NOT EXISTS AlunethHandmade;

USE AlunethHandmade;

CREATE TABLE IF NOT EXISTS Persona (
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    ci INT NOT NULL UNIQUE,
    apellido VARCHAR(30) NOT NULL,
    nro_celular INT NOT NULL UNIQUE,
    rol VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Cuenta (
    id INT NOT NULL AUTO_INCREMENT,
    nro_cuenta INT NOT NULL UNIQUE,
    nombre_usuario VARCHAR(30) NOT NULL UNIQUE,
    contrasenia VARCHAR(35) NOT NULL,
    id_persona INT NULL UNIQUE,
    FOREIGN KEY (id_persona) REFERENCES Persona(id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Pedido (
	id INT NOT NULL AUTO_INCREMENT,
    numero_pedido INT NOT NULL UNIQUE,
    fecha_pedido DATE NOT NULL,
    fecha_recojo DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    total INT NOT NULL,
    id_persona INT NOT NULL,
    id_cuenta INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_persona) REFERENCES Persona(id),
    FOREIGN KEY (id_cuenta) REFERENCES Cuenta(id)
);

CREATE TABLE IF NOT EXISTS Cuaderno (
	id INT NOT NULL AUTO_INCREMENT,
    codigo_catalogo VARCHAR(10) NOT NULL UNIQUE,
    precio FLOAT NOT NULL,
    personalizado BOOLEAN NOT NULL,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    especificaciones VARCHAR(255) NOT NULL,
    image BLOB NULL,
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

-- Inserts
-- Personas
INSERT INTO Persona (nombre,ci,apellido,nro_celular,rol) VALUES 
("Sergio",9454172,"Garcia",72279531,"Cliente"),
("Alieth", 8888888, "Zamorano", 65590177, "Admin");
-- Cuentas
INSERT INTO Cuenta (nro_cuenta,nombre_usuario, contrasenia, id_persona) VALUES 
(1,"Sega1A","Sega1A",1),
(2, "Alune", "Alune", 2);

-- Cuaderno
-- Se debe insertar solamente desde la API para ingresar la imagen :/
-- INSERT INTO Cuaderno (codigo_catalogo,precio, personalizado, nombre, especificaciones) VALUES 
-- ("CA01",35.0,false,"Cuaderno anillado", "Cuaderno anillado tapa dura de 13, forro negro, hojas blancas, carta");

-- Pedido
INSERT INTO Pedido (numero_pedido, fecha_pedido, fecha_recojo, estado, total, id_persona, id_cuenta) VALUES 
(1, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), 0, 0, 1, 1),
(2, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), 0, 0, 2, 2);

-- Pedido_Cuaderno
INSERT INTO Pedido_Cuaderno (id_pedido,id_cuaderno,cantidad) VALUES (1,1,5);

-- select * from Persona;
-- select * from Pedido;
-- select * from Pedido_Cuaderno;
-- select * from Cuenta; 
-- select * from Cuaderno; 