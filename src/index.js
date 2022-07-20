import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import categoriesRouter from './routers/categoriesRouter';
import gamesRouter from './routers/gamesRouter';
import clientsRouter from './routers/clientsRouter';
import rentsRouter from './routers/rentsRouter';


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