import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {

	const socket = io('http://localhost:3002/')

	return (
		<div>
			<button onClick={() => {console.log('printing socket'); socket.emit("message", "hi gv")} }>Socket.io</button>
		</div>
	);
}
