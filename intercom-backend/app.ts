import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
var crypto = require('crypto');
var format = require('biguint-format');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
dotenv.config();

interface NewConversation {
	message: string;
}

interface NewMessage {
	conversation_id: string;
	message: string;
}

const app: Express = express();
app.use(bodyParser.json());
const httpServer = createServer(app);
// httpServer.use(cors());

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000", // Replace with the origin of your frontend
		methods: ["GET", "POST"]
	}
});
app.use(cors());

const message = require('./routes/message')

const get_id = (): string => {
	let id = crypto.randomBytes(8);

	return format(id, 'hex');
}

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

io.on('connection', (socket: any) => {
	console.log('a user connected');

	socket.on('new_conversation', async (data: NewConversation) => {
		try {
			console.log('created conversation', data)
			let conversation_id = get_id()
			// await prisma.Conversation.create({
			// 	data:{
			// 		id: conversation_id
			// 	}
			// })
			await prisma.Message.create({
				data:{
					id: get_id(),
					message: data.message,
					conversation:{
						create : {id: conversation_id}
					}
				}
			})
			console.log(data);
			socket.send({conversation_id: conversation_id})
		} catch (err) {
			console.log(err)
		}
	});

	socket.on('message', async (data: NewMessage) => {
		try {
			await prisma.Message.create({
				data:{
					id: get_id(),
					message: data.message,
					conversation:{
						connect : {id: data.conversation_id}
					}
				}
			})
			console.log(data);
		} catch (err) {

		}
	});
});

app.use('/message', message)

// app.listen(port, () => {
// 	console.log(`[server]: Server is running at http://localhost:${port}`);
// });
const port = process.env.PORT || 3002;

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});