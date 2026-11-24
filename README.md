# Trailerflix - Backend UNTREF

Este proyecto consiste en una API REST de Trailerflix, desarrollada como trabajo práctico de Backend en UNTREF.

La API permite consultar películas y series almacenadas en una base de datos relacional MySQL.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- mysql2
- dotenv

## Instalación

Clonar el repositorio y ejecutar:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto con los datos de conexión a MySQL:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=trailerflix
```

## Base de datos

1. Crear la base de datos `trailerflix` en MySQL.
2. Ejecutar el archivo `database/trailerflix.sql` para crear las tablas.
3. Importar los datos del JSON ejecutando:

```bash
node src/importar.js
```

## Ejecutar el servidor

```bash
node src/server.js
```

La API queda disponible en:

`http://localhost:3000`

## Documentación

En la carpeta `docs/` se encuentran:

- `modelo_relacional.md`: explicación del modelo de base de datos.
- `endpoints.md`: documentación de las rutas disponibles.

## Autor

Trabajo práctico de Backend - UNTREF.