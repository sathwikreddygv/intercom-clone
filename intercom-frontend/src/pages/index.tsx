import { SendOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {

	const socket = io('http://localhost:3002/')

	return (
		<div style={{height:'100vh'}} className="flex flex-col">
			{/* <button onClick={() => {console.log('printing socket'); socket.emit("new_conversation", {message:"hi gv"})} }>Socket.io</button> */}
			<div id='intercom_header' className="flex justify-between align-middle h-40px p-4">
				<div className="flex align-middle">
					<img src="" />
					Sathwik
				</div>
				<div>

				</div>
			</div>
			<div className="bg-white flex-1" style={{ overflow:'auto'}}>

			</div>
			<hr className="border-black"></hr>
			<div className="bg-white h-40px text-black flex justify-between align-middle p-4">
				<div>

				</div>
				<div>
					{/* <img /> */}
					<SendOutlined />
				</div>
			</div>
		</div>
	)
}
