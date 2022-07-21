import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import categoriesRouter from './routers/categoriesRouter.js';
import gamesRouter from './routers/gamesRouter.js';
import clientsRouter from './routers/clientsRouter.js';
import rentsRouter from './routers/rentsRouter.js';

dotenv.config()

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(clientsRouter);
server.use(rentsRouter);

server.listen(PORT, () => {
    console.log("It's alive!");
});