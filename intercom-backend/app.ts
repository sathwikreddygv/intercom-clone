import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
const { createServer } = require('node:http');
const { Server } = require('socket.io');

dotenv.config();

const app: Express = express();

const httpServer = createServer(app);
// httpServer.use(cors());

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000", // Replace with the origin of your frontend
		methods: ["GET", "POST"]
	}
});
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

io.on('connection', (socket: any) => {
	console.log('a user connected');
	socket.on('message', async(message: string) => {
		try{
			console.log(message);
		}catch(err){

		}
	});
});

// app.listen(port, () => {
// 	console.log(`[server]: Server is running at http://localhost:${port}`);
// });
const port = process.env.PORT || 3002;

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});