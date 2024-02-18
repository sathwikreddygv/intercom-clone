import { Request, Response } from 'express';

var send_response_success = (res:Response, data:object) => {
	var response_code = 1;
	var message = 'call success';
	res.status(200).json({response_code, data, message});
}

module.exports = {send_response_success}