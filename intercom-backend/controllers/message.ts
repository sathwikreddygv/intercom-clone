const Utils = require('../utils');
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();
import { Request, Response } from 'express';

const get = async (conversation_id:string) => {
	try {
		if(!conversation_id){
			throw new Error(`Conversation Id is required`)	
		}else{
			let conversation = await prisma.Conversation.findUnique({where: {id: conversation_id}})
			if(!conversation){
				throw new Error(`Invalid Conversation Id`)	
			}else{
				let messages = await prisma.Message.findMany({where: {conversationId: conversation_id}, orderBy: {createdAt:'desc'}})
				return messages
			}
		}
	}catch (err) {
		console.error(err);
		throw new Error(`Could not get messages`)
	}
}

module.exports = {get}