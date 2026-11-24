# Modelo relacional de Trailerflix

## ¿Cómo diseñé la base de datos?

Para realizar este trabajo primero analicé el archivo `trailerflix.json`, que contiene información de películas y series.

Al revisar sus propiedades, observé que había información que podía separarse en diferentes tablas para organizar mejor los datos y evitar repetir información.

Por eso decidí crear una base de datos relacional llamada `trailerflix`, utilizando MySQL.

## Tablas creadas

Para organizar la información utilicé 7 tablas:

### 1. contenido

Es la tabla principal. Guarda los datos de cada película o serie.

Contiene:
- id
- titulo
- resumen
- poster
- trailer
- busqueda
- duracion
- temporadas
- categoria_id
- genero_id

### 2. categorias

Guarda las categorías de los contenidos, que pueden ser Película o Serie.

### 3. generos

Guarda los diferentes géneros, como Drama, Terror, Acción, Comedia y Ciencia Ficción.

### 4. actores

Guarda los nombres de los actores que participan en las películas y series.

### 5. tags

Guarda las etiquetas relacionadas con cada contenido.

### 6. contenido_actores

Es una tabla intermedia que relaciona los contenidos con sus actores.

La utilicé porque un contenido puede tener varios actores y un actor puede participar en diferentes contenidos.

### 7. contenido_tags

Es otra tabla intermedia que relaciona los contenidos con sus etiquetas, ya que cada película o serie puede tener varios tags.

## Relaciones entre las tablas

Las relaciones quedaron organizadas de la siguiente manera:

- Cada contenido pertenece a una categoría.
- Cada contenido pertenece a un género.
- Un contenido puede tener varios actores.
- Un actor puede estar relacionado con varios contenidos.
- Un contenido puede tener varios tags.
- Un tag puede estar relacionado con varios contenidos.

Para resolver las relaciones de muchos a muchos utilicé las tablas intermedias `contenido_actores` y `contenido_tags`.

## Creación de la base de datos

Realicé el diseño de las tablas y sus relaciones utilizando DB Designer.

Después exporté el archivo SQL y lo ejecuté en MySQL Workbench para crear la estructura de la base de datos.

La base de datos se llama `trailerflix` y quedó formada por las 7 tablas mencionadas.

## Migración de los datos

Una vez creada la estructura, trabajé con Node.js para importar la información del archivo `trailerflix.json` a MySQL.

Para realizar la migración utilicé un script llamado `importar.js`.

El proceso permitió cargar los 97 contenidos, junto con sus categorías, géneros, actores y tags.

Finalmente realicé consultas en MySQL Workbench para comprobar que los registros y sus relaciones se hubieran cargado correctamente.

## Conclusión

Con este modelo pude separar la información del archivo JSON en distintas tablas relacionadas entre sí.

De esta manera, la información queda mejor organizada y después puede consultarse desde Node.js mediante consultas SQL.