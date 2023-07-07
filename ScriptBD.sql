--SQL Server

-- Existent database deletion
IF EXISTS(SELECT * FROM sys.databases WHERE name = 'IFX_Prueba')
BEGIN
    ALTER DATABASE IFX_Prueba SET SINGLE_USER WITH ROLLBACK IMMEDIATE
    DROP DATABASE IFX_Prueba
END
GO

-- Database creation

CREATE DATABASE IFX_Prueba
GO

-- Table creation

CREATE TABLE IFX_Prueba.dbo.Subsidiarias
(
    Id_Subsidiaria INT IDENTITY(1,1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Telefono VARCHAR(50) NOT NULL,
    CONSTRAINT PK_TB_Subsidiarias PRIMARY KEY (Id_Subsidiaria)
);
CREATE TABLE IFX_Prueba.dbo.Roles
(
    Id_Rol INT IDENTITY(1,1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    CONSTRAINT PK_TB_Roles PRIMARY KEY (Id_Rol)
);
CREATE TABLE IFX_Prueba.dbo.Empleados
(
    Id_Empleado INT IDENTITY(1,1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Fecha_Nacimiento DATE NOT NULL,
    Id_Subsidiaria INT NOT NULL,
    CONSTRAINT PK_TB_Empleados PRIMARY KEY (Id_Empleado),
    CONSTRAINT FK_TB_Empleados_Subsidiarias FOREIGN KEY (Id_Subsidiaria) REFERENCES Subsidiarias(Id_Subsidiaria)
);
CREATE TABLE IFX_Prueba.dbo.Usuarios
(
    Id_Usuario INT IDENTITY(1,1) NOT NULL,
    Nombre_Usuario VARCHAR(50) NOT NULL,
    Contrasena VARCHAR(50) NOT NULL,
    Rol INT NOT NULL,
    Empleado INT NOT NULL,
    CONSTRAINT PK_TB_Usuarios PRIMARY KEY (Id_Usuario),
    CONSTRAINT FK_TB_Usuarios_Roles FOREIGN KEY (Rol) REFERENCES Roles(Id_Rol),
    CONSTRAINT FK_TB_Usuarios_Empleados FOREIGN KEY (Empleado) REFERENCES Empleados(Id_Empleado)
);
GO

-- Data insertion
INSERT INTO IFX_Prueba.dbo.Subsidiarias (Nombre, Direccion, Telefono) VALUES ('Subsidiaria 1', 'Direccion 1', 'Telefono 1');
INSERT INTO IFX_Prueba.dbo.Subsidiarias (Nombre, Direccion, Telefono) VALUES ('Subsidiaria 2', 'Direccion 2', 'Telefono 2');

INSERT INTO IFX_Prueba.dbo.Roles (Nombre) VALUES ('Administrador');
INSERT INTO IFX_Prueba.dbo.Roles (Nombre) VALUES ('Empleado');

INSERT INTO IFX_Prueba.dbo.Empleados (Nombre, Apellido, Fecha_Nacimiento, Id_Subsidiaria) VALUES ('Empleado 1', 'Apellido 1', '1990-01-01', 1);
INSERT INTO IFX_Prueba.dbo.Empleados (Nombre, Apellido, Fecha_Nacimiento, Id_Subsidiaria) VALUES ('Empleado 2', 'Apellido 2', '1990-01-01', 2);

INSERT INTO IFX_Prueba.dbo.Usuarios (Nombre_Usuario, Contrasena, Rol, Empleado) VALUES ('Usuario 1', 'Contrasena 1', 1, 1);
INSERT INTO IFX_Prueba.dbo.Usuarios (Nombre_Usuario, Contrasena, Rol, Empleado) VALUES ('Usuario 2', 'Contrasena 2', 2, 2);
GO