import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import v1ApiRouter from './routers/v1ApiRouters'
import 'dotenv/config'
import path from 'path';
import db from './db';
const app = express();
const PORT = 3333;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
require('dotenv').config({ path: path.resolve(__dirname, 'variable.env') })
db();
app.use(helmet());
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', v1ApiRouter);
httpServer.listen(process.env.PORT_SERVER, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.PORT_SERVER}`);
});

export default io