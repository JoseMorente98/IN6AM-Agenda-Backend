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
	fechaRegistro DATETIME NOT NULL
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
-- Agregar Categoria
CREATE PROCEDURE SP_AgregarCategoria(IN _nombre VARCHAR(25))
	INSERT INTO categoria(nombre) VALUES (_nombre);
	
-- Actualizar Categoria
CREATE PROCEDURE SP_ActualizarCategoria(IN _idCategoria INT, IN _nombre VARCHAR(25))
	UPDATE categoria SET nombre=_nombre WHERE idCategoria = _idCategoria;
	
-- Eliminar Categoria
CREATE PROCEDURE SP_EliminarCategoria(IN _idCategoria INT)
	DELETE FROM categoria WHERE idCategoria = _idCategoria;

-- Agregar Usuario
CREATE PROCEDURE SP_AgregarUsuario(IN _correo VARCHAR(50), IN _contrasena VARCHAR(50))
	INSERT INTO usuario(nick, contrasena) VALUES (_correo, _contrasena);

-- Actualizar Usuario
CREATE PROCEDURE SP_ActualizarUsuario(IN _correo VARCHAR(50), IN _contrasena VARCHAR(50), IN _idUsuario INT)
	UPDATE usuario SET nick=_correo, contrasena=_contrasena WHERE idUsuario = _idUsuario;
	
-- Eliminar Categoria
CREATE PROCEDURE SP_EliminarUsuario(IN _idUsuario INT)
	DELETE FROM usuario WHERE idUsuario = _idUsuario;
	
-- Agregar Contacto
CREATE PROCEDURE SP_AgregarContacto(IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
		INSERT INTO contacto(nombre, apellido, telefono, correo, idCategoria) 
			VALUES (_nombre,_apellido,_telefono,_correo,_idCategoria);

-- Actualizar Contacto
CREATE PROCEDURE SP_ActualizarContacto(IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT, IN _idContacto INT)
		UPDATE contacto SET nombre = _nombre, apellido = _apellido, telefono = _telefono,
		correo = _correo, idCategoria = _idCategoria WHERE idContacto = _idContacto;
		
-- Eliminar Contacto
CREATE PROCEDURE SP_EliminarContacto(IN _idContacto INT)
	DELETE FROM contacto WHERE idContacto = _idContacto;
	
-- Eliminar DetalleUsuario
CREATE PROCEDURE SP_EliminarDetalleUsuario(IN _idDetalleUsuario INT)
	DELETE FROM detalleusuario WHERE idDetalleUsuario = _idDetalleUsuario;

-- Agregar Tarea
CREATE PROCEDURE SP_AgregarTarea(IN _nombre VARCHAR(100), IN _descripcion VARCHAR(255), IN _fechaEntrega DATETIME)
	INSERT INTO Tarea(nombre, descripcion, fechaRegistro, fechaEntrega) 
		VALUES (_nombre, _descripcion, NOW(), _fechaEntrega);

-- Actualizar Tarea
CREATE PROCEDURE SP_ActualizarTarea(IN _nombre VARCHAR(100), IN _descripcion VARCHAR(255), IN _fechaEntrega DATETIME, IN _idTarea INT)
	UPDATE Tarea SET nombre = _nombre, descripcion = _descripcion, fechaRegistro = NOW(),
		fechaEntrega = _fechaEntrega WHERE idTarea = _idTarea;

-- Eliminar Tarea
CREATE PROCEDURE SP_EliminarTarea(IN _idTarea INT)
	DELETE FROM Tarea WHERE idTarea = _idTarea;

-- Agregar DetalleUsuario
DELIMITER $$
CREATE PROCEDURE SP_AgregarDetalleUsuario(IN _idUsuario INT, IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
BEGIN
	
    DECLARE _idContacto INT;
    
    CALL SP_AgregarContacto(_nombre, _apellido, _telefono, _correo, _idCategoria);
    
    SET _idContacto = (LAST_INSERT_ID());
	INSERT INTO DetalleUsuario(idUsuario,idContacto) VALUES (_idUsuario, _idContacto);
	SELECT * FROM DetalleUsuario;
END;
$$

-- Agregar Historial
DELIMITER $$
CREATE PROCEDURE SP_AgregarHistorial(IN _idUsuario INT, IN _descripcion VARCHAR(255))
BEGIN
	INSERT INTO Historial(idUsuario,descripcion, fechaRegistro) VALUES (_idUsuario, _descripcion, NOW());
	SELECT * FROM Historial;
END;
$$