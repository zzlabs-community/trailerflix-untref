
const db = require('./db');

async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('¡Conexión exitosa con MySQL!');
        connection.release();
    } catch (error) {
        console.error('Error de conexión:', error.message);
    } finally {
        await db.end();
    }
}

testConnection();
