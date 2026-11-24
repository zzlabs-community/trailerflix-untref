
require('dotenv').config();

const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido a la API de Trailerflix',
        estado: 'Servidor funcionando correctamente'
    });
});

// Verificar conexión con MySQL
app.get('/test-db', async (req, res) => {
    try {
        const [resultado] = await db.query(
            'SELECT COUNT(*) AS total FROM contenido'
        );

        res.json({
            mensaje: 'Conexión exitosa con MySQL',
            total_contenidos: resultado[0].total
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al consultar la base de datos'
        });
    }
});

// Obtener todos los contenidos
app.get('/contenidos', async (req, res) => {
    try {
        const [contenidos] = await db.query(`
            SELECT
                c.id,
                c.titulo,
                c.resumen,
                c.poster,
                c.trailer,
                c.duracion,
                c.temporadas,
                cat.nombre AS categoria,
                g.nombre AS genero,

                (
                    SELECT JSON_ARRAYAGG(a.nombre_completo)
                    FROM contenido_actores ca
                    INNER JOIN actores a ON ca.actor_id = a.id
                    WHERE ca.contenido_id = c.id
                ) AS actores,

                (
                    SELECT JSON_ARRAYAGG(t.nombre)
                    FROM contenido_tags ct
                    INNER JOIN tags t ON ct.tag_id = t.id
                    WHERE ct.contenido_id = c.id
                ) AS tags

            FROM contenido c
            INNER JOIN categorias cat ON c.categoria_id = cat.id
            INNER JOIN generos g ON c.genero_id = g.id
            ORDER BY c.id
        `);

        res.json(contenidos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al obtener los contenidos'
        });
    }
});

// Obtener un contenido por su ID
app.get('/contenidos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [contenidos] = await db.query(`
            SELECT
                c.id,
                c.titulo,
                c.resumen,
                c.poster,
                c.trailer,
                c.duracion,
                c.temporadas,
                cat.nombre AS categoria,
                g.nombre AS genero,

                (
                    SELECT JSON_ARRAYAGG(a.nombre_completo)
                    FROM contenido_actores ca
                    INNER JOIN actores a ON ca.actor_id = a.id
                    WHERE ca.contenido_id = c.id
                ) AS actores,

                (
                    SELECT JSON_ARRAYAGG(t.nombre)
                    FROM contenido_tags ct
                    INNER JOIN tags t ON ct.tag_id = t.id
                    WHERE ct.contenido_id = c.id
                ) AS tags

            FROM contenido c
            INNER JOIN categorias cat ON c.categoria_id = cat.id
            INNER JOIN generos g ON c.genero_id = g.id
            WHERE c.id = ?
        `, [id]);

        if (contenidos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontró ningún contenido con ese ID'
            });
        }

        res.json(contenidos[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al buscar el contenido'
        });
    }
});

 // Filtrar contenidos por categoría
app.get('/contenidos/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;

        const [contenidos] = await db.query(`
            SELECT
                c.id,
                c.titulo,
                c.resumen,
                c.poster,
                c.trailer,
                c.duracion,
                c.temporadas,
                cat.nombre AS categoria,
                g.nombre AS genero
            FROM contenido c
            INNER JOIN categorias cat ON c.categoria_id = cat.id
            INNER JOIN generos g ON c.genero_id = g.id
            WHERE cat.nombre = ?
            ORDER BY c.id
        `, [categoria]);

        if (contenidos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron contenidos para esa categoría'
            });
        }

        res.json(contenidos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al filtrar los contenidos'
        });
    }
});

 // Filtrar contenidos por género
app.get('/contenidos/genero/:genero', async (req, res) => {
    try {
        const genero = req.params.genero;

        const [contenidos] = await db.query(`
            SELECT
                c.id,
                c.titulo,
                c.resumen,
                c.poster,
                c.trailer,
                c.duracion,
                c.temporadas,
                cat.nombre AS categoria,
                g.nombre AS genero
            FROM contenido c
            INNER JOIN categorias cat ON c.categoria_id = cat.id
            INNER JOIN generos g ON c.genero_id = g.id
            WHERE g.nombre = ?
            ORDER BY c.id
        `, [genero]);

        if (contenidos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontraron contenidos para ese género'
            });
        }

        res.json(contenidos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al filtrar los contenidos por género'
        });
    }
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Trailerflix funcionando en http://localhost:${PORT}`);
});
