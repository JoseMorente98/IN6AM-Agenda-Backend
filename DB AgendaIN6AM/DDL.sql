-- CREAR BASE DE DATOS
CREATE DATABASE AgendaIN6AM;

-- USAR BASE DE DATOS
USE AgendaIN6AM;

-- CREAR TABLA CATEGORIA
CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL
);

-- CREAR TABLA CONTACTO
CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	telefono VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	idCategoria INT NOT NULL,
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- CREAR TABLA USUARIO
CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nick VARCHAR(50) NOT NULL,
	contrasena VARCHAR(50) NOT NULL
);

-- CREAR TABLA DETALLE USUARIO
CREATE TABLE DetalleUsuario(
	idDetalleUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- CREAR TABLA TAREA
CREATE TABLE Tarea(
	idTarea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	fechaEntrega DATETIME NOT NULL,
	fechaRegistro DATETIME NOT NULL,
	idUsuario INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- CREAR TABLA HISTORIAL
CREATE TABLE Historial(
	idHistorial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	fechaRegistro DATETIME NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

-- STORAGE PROCEDURES
-- Agregar Usuario
CREATE PROCEDURE SP_AgregarUsuario(IN _correo VARCHAR(50), IN _contrasena VARCHAR(50))
	INSERT INTO usuario(nick, contrasena) VALUES (_correo, _contrasena);

-- Actualizar Usuario
CREATE PROCEDURE SP_ActualizarUsuario(IN _correo VARCHAR(50), IN _contrasena VARCHAR(50), IN _idUsuario INT)
	UPDATE usuario SET nick=_correo, contrasena=_contrasena WHERE idUsuario = _idUsuario;
	
-- Eliminar Usuario
CREATE PROCEDURE SP_EliminarUsuario(IN _idUsuario INT)
	DELETE FROM usuario WHERE idUsuario = _idUsuario;

-- Agregar Contacto
CREATE PROCEDURE SP_AgregarContacto(IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
		INSERT INTO contacto(nombre, apellido, telefono, correo, idCategoria) 
			VALUES (_nombre,_apellido,_telefono,_correo,_idCategoria);

-- Agregar Historial
DELIMITER $$
CREATE PROCEDURE SP_AgregarHistorial(IN _idUsuario INT, IN _descripcion VARCHAR(255))
BEGIN
	INSERT INTO Historial(idUsuario,descripcion, fechaRegistro) 
	VALUES (_idUsuario, _descripcion, NOW());
END;
$$

-- Agregar Categoria
DELIMITER $$
CREATE PROCEDURE SP_AgregarCategoria(IN _idUsuario INT, IN _nombre VARCHAR(25))
BEGIN
	DECLARE _descripcion VARCHAR(255);
	SET _descripcion = CONCAT("Agregaste la categoría ", _nombre, " exitosamente.");
	INSERT INTO categoria(nombre) VALUES (_nombre);
	CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

-- Actualizar Categoria
DELIMITER $$
CREATE PROCEDURE SP_ActualizarCategoria(IN _idUsuario INT, IN _nombre VARCHAR(25), IN _idCategoria INT)
BEGIN
	DECLARE _descripcion VARCHAR(255);
	SET _descripcion = CONCAT("Actualizaste la categoría ", _nombre, " exitosamente.");
	UPDATE categoria SET nombre = _nombre WHERE idCategoria = _idCategoria;
	CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

-- Agregar DetalleUsuario
DELIMITER $$
CREATE PROCEDURE SP_AgregarDetalleUsuario(IN _idUsuario INT, IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
BEGIN
    DECLARE _idContacto INT;
    DECLARE _descripcion VARCHAR(255);
    CALL SP_AgregarContacto(_nombre, _apellido, _telefono, _correo, _idCategoria);
    SET _idContacto = (LAST_INSERT_ID());
    SET _descripcion = CONCAT("Agregaste al contacto ", _nombre, " ", _apellido, " exitosamente.");
	INSERT INTO DetalleUsuario(idUsuario,idContacto) VALUES (_idUsuario, _idContacto);
    CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

-- Actualizar Contacto
DELIMITER $$
CREATE PROCEDURE SP_ActualizarContacto(IN _idUsuario INT, IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT, IN _idContacto INT)
BEGIN
    DECLARE _idContacto INT;
    DECLARE _descripcion VARCHAR(255);
    UPDATE contacto SET nombre = _nombre, apellido = _apellido, telefono = _telefono,
		correo = _correo, idCategoria = _idCategoria WHERE idContacto = _idContacto;
    SET _descripcion = CONCAT("Actualizaste al contacto ", _nombre, " ", _apellido, " exitosamente.");
    CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$
-- Actualizar Tarea
CREATE PROCEDURE SP_ActualizarTarea(IN _nombre VARCHAR(100), IN _descripcion VARCHAR(255), IN _fechaEntrega DATETIME, IN _idTarea INT)
	UPDATE Tarea SET nombre = _nombre, descripcion = _descripcion, fechaRegistro = NOW(),
		fechaEntrega = _fechaEntrega WHERE idTarea = _idTarea;

-- Agregar Tarea
DELIMITER $$
CREATE PROCEDURE SP_AgregarTarea(IN _idUsuario INT, IN _nombre VARCHAR(100), IN _descripcion VARCHAR(255), IN _fechaEntrega DATETIME)
BEGIN
	DECLARE _detalle VARCHAR(255);
	SET _detalle = CONCAT("Agregaste la tarea ", _nombre, " exitosamente.");
	INSERT INTO Tarea(nombre, descripcion, fechaRegistro, fechaEntrega, idUsuario) 
		VALUES (_nombre, _descripcion, NOW(), _fechaEntrega, _idUsuario);
	CALL SP_AgregarHistorial(_idUsuario, _detalle);
END;
$$

-- Agregar Tarea
DELIMITER $$
CREATE PROCEDURE SP_ActualizarTarea(IN _idUsuario INT, IN _nombre VARCHAR(100), 
	IN _descripcion VARCHAR(255), IN _fechaEntrega DATETIME, IN _idTarea INT)
BEGIN
	DECLARE _detalle VARCHAR(255);
	SET _detalle = CONCAT("Actualizaste la tarea ", _nombre, " exitosamente.");
	UPDATE Tarea SET nombre = _nombre, descripcion = _descripcion, fechaRegistro = NOW(),
		fechaEntrega = _fechaEntrega, idUsuario = _idUsuario WHERE idTarea = _idTarea;
	CALL SP_AgregarHistorial(_idUsuario, _detalle);
END;
$$

-- Eliminar Contacto
DELIMITER $$
CREATE PROCEDURE SP_EliminarContacto(IN _idUsuario INT, IN _idContacto INT)
BEGIN
	DECLARE _nombre VARCHAR(255);
	DECLARE _apellido VARCHAR(255);
	DECLARE _descripcion VARCHAR(255);
	SET _nombre = SELECT nombre FROM Contacto where idContacto = _idContacto;
	SET _apellido = SELECT apellido FROM Contacto where idContacto = _idContacto;
	SET _descripcion = CONCAT("Eliminaste al contacto ", _nombre, " ", _apellido, " exitosamente.");
	DELETE FROM contacto WHERE idContacto = _idContacto;
	CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

-- Eliminar Tarea
DELIMITER $$
CREATE PROCEDURE SP_EliminarTarea(IN _idUsuario INT, IN _idTarea INT)
BEGIN
	DECLARE _nombre VARCHAR(255);
	DECLARE _descripcion VARCHAR(255);
	SET _nombre = SELECT nombre FROM Tarea WHERE idTarea = _idTarea;
	SET _descripcion = CONCAT("Eliminaste la tarea ", _nombre," exitosamente.");
	DELETE FROM Tarea WHERE idTarea = _idTarea;
	CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

-- Eliminar Tarea
DELIMITER $$
CREATE PROCEDURE SP_EliminarCategoria(IN _idUsuario INT, IN _idCategoria INT)
BEGIN
	DECLARE _nombre VARCHAR(255);
	DECLARE _descripcion VARCHAR(255);
	SET _nombre = SELECT nombre FROM Categoria WHERE idCategoria = _idCategoria;
	SET _descripcion = CONCAT("Eliminaste la categoría ", _nombre," exitosamente.");
	DELETE FROM Categoria WHERE idCategoria = _idCategoria;
	CALL SP_AgregarHistorial(_idUsuario, _descripcion);
END;
$$

CALL SP_AgregarUsuario("admin", "admin");