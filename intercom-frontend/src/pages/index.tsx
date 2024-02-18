
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IconSend2 } from '@tabler/icons-react';
import { Input } from '@mantine/core';

interface Message{

}

export default function Home() {

	const [message, set_message] = useState<string>();
	const [messages, set_messages] = useState<[{message:string}]>();
	const [socket, set_socket] = useState<SocketIOClient.Socket | null>(null);
	const [conversation_id, set_conversation_id] = useState<string>('');

	useEffect(() => {
		const socket = io('http://localhost:3002/')
		set_socket(socket);

		socket.on('message', (message: { conversation_id: string }) => {
			set_conversation_id(message.conversation_id)
			get_messages(message.conversation_id)
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const socket_emit = async() => {
		try {
			if(conversation_id){
				await socket.emit("message", { conversation_id, message })
				get_messages(conversation_id)
			}else{
				await socket.emit("new_conversation", { message })
			}
			set_message('')
		}catch (err) {
			console.error(err)
		}
	}

	const get_messages = async(conversation_id:string) => {
		try {
			let options:RequestInit = { 
				method:'POST', 
				headers:{'Content-Type': 'application/json'}, 
				credentials:'omit', 
				body:JSON.stringify({conversation_id: conversation_id})};
			let resp: Response = await fetch('http://localhost:3002/message/get', options)
			let data = await resp.json();
			set_messages(data.data)
		}catch (err) {
			console.error(err)
		}
	}

	return (
		<div style={{ height: '100vh' }} className="flex flex-col">
			<div id='intercom_header' className="flex justify-between items-center h-40px">
				<div className="flex items-center">
					<img src="./my_avatar.png" height={'54px'} width={'54px'} className="mr-1" />
					<div className="text-lg">Sathwik</div>
				</div>
				<div>

				</div>
			</div>
			<div className="bg-white flex-1" style={{ overflow: 'auto' }}>
			{
				messages && messages.length ? messages.map((single_message, idx) => (
					<div className="flex justify-end my-2 mr-2 ">
						<div className="bg-black p-2 rounded-l-large rounded-tr-large max-w-1/2 overflow-wrap text-sm">{single_message.message}</div>
					</div>
				)):''
			}
			</div>
			<hr className="border-black"></hr>
			<div className="bg-white h-40px text-black flex justify-between items-center p-4">
				<Input
					width={'100%'}
					height={'40px'}
					placeholder="Type..."
					value={message}
					onKeyDown={(e) => e.key === 'Enter' ? (socket_emit(), console.log('Enter')) : ''}
					onChange={e => set_message(e.target.value)}
				/>
				<IconSend2 stroke={1} onClick={(e) => socket_emit()} />
			</div>
		</div>
	)
}
