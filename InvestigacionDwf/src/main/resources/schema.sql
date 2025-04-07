DROP DATABASE IF EXISTS pruebaseguridad;
CREATE DATABASE IF NOT EXISTS pruebaseguridad;
USE pruebaseguridad;
-- Elimina las tablas existentes en el orden adecuado para evitar conflictos de claves foráneas
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS compra;
DROP TABLE IF EXISTS ropa;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- Tabla para la entidad Role
CREATE TABLE roles (
    idRole BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla para la entidad User
CREATE TABLE users (
    idUser BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Tabla intermedia para la relación ManyToMany entre User y Role
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(idUser) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(idRole) ON DELETE CASCADE
);

-- Tabla para la entidad Ropa
CREATE TABLE ropa (
    idRopa BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio DOUBLE NOT NULL
);

-- Tabla para la entidad Compra, que relaciona User y Ropa
CREATE TABLE compra (
    idCompra BIGINT AUTO_INCREMENT PRIMARY KEY,
    fechaCompra DATETIME NOT NULL,
    cantidad INT NOT NULL,
    total DOUBLE NOT NULL,
    user_id BIGINT,
    ropa_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(idUser) ON DELETE CASCADE,
    FOREIGN KEY (ropa_id) REFERENCES ropa(idRopa) ON DELETE CASCADE
);

-- Example user with ROLE_USER
INSERT INTO users (idUser, username, password, email, token) VALUES (1, 'testuser', 'hashedpassword', 'testuser@example.com', null);

-- Assign ROLE_USER to the user
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);