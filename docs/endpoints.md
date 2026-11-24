# Documentación de la API Trailerflix

## ¿De qué se trata el proyecto?

En este trabajo desarrollé una API para Trailerflix utilizando Node.js, Express y MySQL.

Primero trabajé con el archivo `trailerflix.json`, que contiene información sobre películas y series. A partir de esos datos diseñé una base de datos relacional para poder organizar mejor la información.

Separé los datos en diferentes tablas, como contenidos, categorías, géneros, actores y tags. También creé tablas intermedias para relacionar los contenidos con sus actores y etiquetas.

Después importé los datos del archivo JSON a MySQL y comencé a desarrollar los endpoints para poder consultar la información desde la API.

## Cómo iniciar el proyecto

Para ejecutar el proyecto, primero hay que instalar las dependencias:

```bash
npm install
```

También es necesario configurar el archivo `.env` con los datos de conexión a MySQL.

Una vez configurado, se inicia el servidor con:

```bash
node src/server.js
```

La API queda disponible en:

`http://localhost:3000`

## Endpoints desarrollados

### 1. Página principal

**Método:** GET

**Ruta:** `/`

La utilicé para comprobar que el servidor estuviera funcionando correctamente.

### 2. Verificar conexión con MySQL

**Método:** GET

**Ruta:** `/test-db`

Con este endpoint comprobé que Node.js pudiera conectarse correctamente con MySQL. También permite consultar cuántos contenidos hay registrados en la base de datos.

### 3. Obtener todos los contenidos

**Método:** GET

**Ruta:** `/contenidos`

Este endpoint devuelve todas las películas y series que están guardadas en la base de datos.

También muestra información relacionada con cada contenido, como su categoría, género, actores y tags.

### 4. Buscar un contenido por ID

**Método:** GET

**Ruta:** `/contenidos/:id`

Lo utilicé para buscar una película o serie específica mediante su identificador.

Por ejemplo:

`http://localhost:3000/contenidos/3`

Si el ID no existe, la API devuelve un mensaje indicando que no se encontró el contenido.

### 5. Filtrar por categoría

**Método:** GET

**Ruta:** `/contenidos/categoria/:categoria`

Este endpoint permite separar las películas de las series.

Ejemplos:

- `/contenidos/categoria/Película`
- `/contenidos/categoria/Serie`

### 6. Filtrar por género

**Método:** GET

**Ruta:** `/contenidos/genero/:genero`

Permite consultar los contenidos según el género al que pertenecen.

Ejemplos:

- `/contenidos/genero/Drama`
- `/contenidos/genero/Terror`

## Pruebas realizadas

Durante el desarrollo fui probando los endpoints desde el navegador para comprobar que las consultas funcionaran correctamente.

También verifiqué que se pudieran recuperar los actores y tags relacionados con cada contenido y que la API respondiera correctamente cuando buscaba un ID inexistente.

La migración se realizó correctamente y se comprobaron los 97 registros del archivo original.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- MySQL2
- dotenv

## Conclusión

Con este trabajo pude practicar cómo pasar información de un archivo JSON a una base de datos relacional, crear tablas y relaciones en MySQL y después utilizar Node.js y Express para consultar esos datos mediante una API.

También pude trabajar con consultas SQL que relacionan varias tablas para obtener información más completa de cada película o serie.