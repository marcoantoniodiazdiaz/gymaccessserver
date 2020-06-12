import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';

// Rutas
import router from './routes/router';
import counter from './routes/counter.routes';
import gym from './routes/gym.routes';
import uploads from './routes/uploads.routes';
import usuarios from './routes/usuarios.routes';
import login from './routes/login.routes';

// MySQL
import MySQL from './database/mysql';

const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// FRONTEND
// server.app.use(express.static('public'));

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de MongoDB
server.app.use('/', router);
server.app.use('/', counter);
server.app.use('/', gym);
server.app.use('/', usuarios);
server.app.use('/', uploads);
server.app.use('/', login);

MySQL.instance;

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
