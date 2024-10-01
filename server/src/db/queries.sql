-- Run this script in MysqlServer after run the server.
CREATE DATABASE IF NOT EXISTS AlunethHandmade;

USE AlunethHandmade;

CREATE TABLE IF NOT EXISTS product (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id)
);
