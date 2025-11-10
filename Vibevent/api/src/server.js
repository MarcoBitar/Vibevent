import {app} from './app.js';
import dotenv from 'dotenv';
import { initSocketServer } from './infrastructure/socket/socketServer.js';
dotenv.config();

const port = process.env.PORT || 4000;

const httpServer = app.listen(port, () => console.log(`API http://localhost:${port}`));

initSocketServer(httpServer);