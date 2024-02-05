import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {

	const [message, set_message] = useState();

	const socket = io('http://localhost:3002/')


	return (
		<div style={{height:'100vh'}} className="flex flex-col">
			{/* <button onClick={() => {console.log('printing socket'); socket.emit("new_conversation", {message:"hi gv"})} }>Socket.io</button> */}
			<div id='intercom_header' className="flex justify-between items-center h-40px">
				<div className="flex items-center">
					<img src="./my_avatar.png" height={'54px'} width={'54px'} className="mr-1"/>
					<div className="text-lg">Sathwik</div>
				</div>
				<div>

				</div>
			</div>
			<div className="bg-white flex-1" style={{ overflow:'auto'}}>

			</div>
			<hr className="border-black"></hr>
			<div className="bg-white h-40px text-black flex justify-between items-center p-4">
				<div>
					<Input value={message} ></Input>
				</div>
				<div className="flex items-center">
					{/* <img /> */}
					<SendOutlined onClick={() => {}}/>
				</div>
			</div>
		</div>
	)
}
