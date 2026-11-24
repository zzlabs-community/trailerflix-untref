
const fs = require('fs');
const path = require('path');
const db = require('./db');

const archivoJSON = path.join(__dirname, '../database/trailerflix.json');

function separarValores(valor) {
    if (!valor || typeof valor !== 'string') return [];

    return [...new Set(
        valor.split(',')
            .map(item => item.trim())
            .filter(Boolean)
    )];
}

async function obtenerId(connection, tabla, campo, valor) {
    await connection.execute(
        `INSERT IGNORE INTO ${tabla} (${campo}) VALUES (?)`,
        [valor]
    );

    const [filas] = await connection.execute(
        `SELECT id FROM ${tabla} WHERE ${campo} = ?`,
        [valor]
    );

    return filas[0].id;
}

async function importar() {
    const datos = JSON.parse(
        fs.readFileSync(archivoJSON, 'utf8')
    );

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        for (const item of datos) {
            // Categoría
            const categoriaId = await obtenerId(
                connection, 'categorias', 'nombre', item.categoria
            );

            // Género
            const generoId = await obtenerId(
                connection, 'generos', 'nombre', item.genero
            );

            // Contenido: conserva el ID original
            await connection.execute(
                `INSERT INTO contenido
                (id, titulo, resumen, poster, trailer, busqueda,
                 duracion, temporadas, categoria_id, genero_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                titulo = VALUES(titulo),
                resumen = VALUES(resumen),
                poster = VALUES(poster),
                trailer = VALUES(trailer),
                busqueda = VALUES(busqueda),
                duracion = VALUES(duracion),
                temporadas = VALUES(temporadas),
                categoria_id = VALUES(categoria_id),
                genero_id = VALUES(genero_id)`,
                [
                    item.id,
                    item.titulo,
                    item.resumen || null,
                    item.poster || null,
                    item.trailer || null,
                    item.busqueda || null,
                    item.duracion == null ? null : String(item.duracion),
                    item.temporadas == null ? null : String(item.temporadas),
                    categoriaId,
                    generoId
                ]
            );

            // Actores y relación con contenido
            for (const nombre of separarValores(item.reparto)) {
                const actorId = await obtenerId(
                    connection, 'actores', 'nombre_completo', nombre
                );

                await connection.execute(
                    `INSERT IGNORE INTO contenido_actores
                    (contenido_id, actor_id) VALUES (?, ?)`,
                    [item.id, actorId]
                );
            }

            // Tags y relación con contenido
            for (const nombre of separarValores(item.tags)) {
                const tagId = await obtenerId(
                    connection, 'tags', 'nombre', nombre
                );

                await connection.execute(
                    `INSERT IGNORE INTO contenido_tags
                    (contenido_id, tag_id) VALUES (?, ?)`,
                    [item.id, tagId]
                );
            }
        }

        await connection.commit();

        console.log('¡Migración completada!');
        console.log('Registros procesados:', datos.length);

    } catch (error) {
        await connection.rollback();
        console.error('Error durante la migración:', error.message);

    } finally {
        connection.release();
        await db.end();
    }
}

importar();
