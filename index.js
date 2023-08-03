const server = require('./src/app');
const createBBDD = require('./src/database/createBBDD');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor escuchando por el puerto ${PORT}`);
});

createBBDD();