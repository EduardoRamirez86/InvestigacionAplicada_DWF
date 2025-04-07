-- Elimina las tablas existentes en orden adecuado para evitar conflictos de claves foráneas
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS Compra;
DROP TABLE IF EXISTS Ropa;
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
                      nombre VARCHAR(50),
                      precio DOUBLE
);

-- Tabla para la entidad Compra, que relaciona User y Ropa
CREATE TABLE compra (
                        idCompra BIGINT AUTO_INCREMENT PRIMARY KEY,
                        fechaCompra DATETIME,
                        cantidad INT,
                        total DOUBLE,
                        user_id BIGINT,
                        ropa_id BIGINT,
                        FOREIGN KEY (user_id) REFERENCES users(idUser) ON DELETE CASCADE,
                        FOREIGN KEY (ropa_id) REFERENCES Ropa(idRopa) ON DELETE CASCADE
);