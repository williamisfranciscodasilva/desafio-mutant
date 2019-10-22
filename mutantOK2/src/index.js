import express from 'express';
import routes from './routes';

const server = express();

server.use(routes);
server.use(express.json());

server.listen(8080);