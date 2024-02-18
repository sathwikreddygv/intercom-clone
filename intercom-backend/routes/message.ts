import { Request, Response } from 'express';
const express = require('express')
const router = express.Router()
const Utils = require('../utils');
const Message = require('../controllers/message');

router.post('/get', async (req:Request, res:Response) => {
	try {
		let {conversation_id} = req.body;
		return Utils.send_response_success(res, await Message.get(conversation_id))
	}catch (err) {
		res.status(200).send({response_code: -1});
	}
})

module.exports = router