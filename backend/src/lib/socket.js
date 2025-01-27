import {Server} from 'socket.io';
import http from 'http' ;
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5500;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [CLIENT_ORIGIN]
  }
})

export {io, app, server}