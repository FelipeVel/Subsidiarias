# Sistema de gestión de subsidiarias

## Tecnologias usadas:

Para el desarrollo del sistema se utilizó:

- [NodeJs](https://nodejs.org/en/about) para el back-end
- [ReactJs](https://react.dev/) para el front-end
- [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server/) para la base de datos
- [Swagger](https://swagger.io/) para la documentación
- [Jest](https://jestjs.io/) y [Supertest](https://www.npmjs.com/package/supertest) para pruebas unitarias

## Pre-requisitos:

Para la ejecución de este sistema, es necesario tener instaladas las siguientes herramientas:

- NodeJs
- ReactJs
- Microsoft SQL Server

## Guía de instalación

### Base de datos

Una vez se tengan instaladas las herramientas de software necesarias, se instalará el aplicativo.

Primero, es necesario ejecutar el [script de creación de la base de datos](ScriptBD.sql), para esto se ejecuta el siguiente comando:

`sqlcmd -S [Servidor]\[Instancia] -i [Ruta del archivo ScriptBD.sql]`

Una vez ejecutado este comando, ya estará la base de datos montada en el servidor.

### Back-end

Lo siguiente es instalar y configurar el back-end, para esto, desde la terminal, hay que navegar hasta la ruta donde se descargó el repositorio, y estando ahí, hay que ejecutar los siguientes comandos

```
    cd Back
    npm install
```

Luego, se configuran las variables de entorno, para esto, en la carpeta Back, se tiene que crear un archivo .env con las siguientes variables:

- PORT: Puerto de ejecución del API (Por defecto es 3080)
- DB_USER: Usuario de acceso a BD
- DB_PASSWORD: Contraseña de acceso a BD
- DB_SERVER: Servidor en donde se encuentra desplegada la BD
- DB_DATABASE: Nombre de la base de datos
- JWT_SECRET= Cadena de caracteres aleatoria para la generación y validación de Tokens

Las siguientes variables son necesarias sólo para pruebas unitarias:

- ADMIN_TOKEN_TEST: Token de un usuario administrador generado por el API
- USER_TOKEN_TEST: Token de un usuario empleado generado por el API

Con esto, ya estará lista la configuración del back-end, para ejecutarlo se debe ejecutar el comando `npm start`.

### Front-End

Por último, se configura el cliente, para esto se debe navegar otra vez a la ruta raíz del repositorio y ejecutar los siguientes comandos:

```
    cd client
    npm install
```

Una vez se ejecutaron estas lineas, se debe crear también en la carpeta `client` un archivo .env con las siguientes variables de entorno:

- REACT_APP_API_URL: Ruta donde se ejecuta el API (Ej. 'http://localhost:3080')

Una vez se tiene configurado el entorno, se puede ejecutar el cliente con el comando `npm start`.

## Pruebas unitarias

Para la ejecución de pruebas unitarias, se debe ejecutar el script de la base de datos por defecto para tener los ids necesarios y, en la carpeta Back, se debe ejecutar el comando `npm test`.

## Documentación del API

El API cuenta con documentación con Swagger, se puede acceder a ella mediante el endpoint `/api-docs`, este endpoint es mostrado en la consola en el momento de ejecución del API.
