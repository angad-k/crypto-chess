import React, { useState } from "react";
import { MSG_DELIM, splitMessage, truncatePubKey } from "../utils/utils";
const url = "ws://localhost:4000";
const Message = (props) => {
	return (
		<>
			<div className="rounded-xl p-2 bg-b2">
				<div className="flex flex-row">
					<p className="text-white font-medium opacity-75 text-sm bg-b1 rounded-full py-1 px-2 w-2/5 text-center">
						{truncatePubKey(props.pubKey)}
					</p>
					<p className="text-primary font-medium ml-2 text-sm py-1 px-2">
						{props.isBlack ? "• Playing black" : ""}
						{props.isWhite ? "• Playing white" : ""}
					</p>
				</div>
				<p className="text-white mt-2 p-2 opacity-75 rounded-xl bg-b1">
					{props.message}
				</p>
			</div>
		</>
	);
};

const Chat = (props) => {
	const [chatSocket, setChatSocket] = useState(null);
	const [opened, setOpened] = useState(false);
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState("");
	const [placeholder, setPlaceholder] = useState(false);
	if (!chatSocket) {
		let s = new WebSocket(url);
		s.onmessage = (event) => {
			let msg = event.data;
			let [cmd, arg] = splitMessage(msg);
			console.log(msg);
			switch (cmd) {
				case "chat": {
					let [gameCode, extra] = splitMessage(arg);
					if (gameCode == props.gameCode) {
						let [pubKey, msg_isB_isW] = splitMessage(extra);
						let [message, isB_isW] = splitMessage(msg_isB_isW);
						let [isB, isW] = splitMessage(isB_isW);
						let newMessages = messages;
						newMessages.reverse();
						isB = isB === "false" ? false : true;
						isW = isW === "false" ? false : true;
						newMessages.push({
							pubKey: pubKey,
							message: message,
							isBlack: isB,
							isWhite: isW,
						});
						newMessages.reverse();
						console.log(newMessages);
						setMessages(newMessages);
						setPlaceholder(!placeholder);
						setMessageText(" ");
						setMessageText("");
					}
					break;
				}
				default: {
					//do nothing
				}
			}
		};
		setChatSocket(s);
	}
	const sendMessage = (message) => {
		if (message == "") {
			return;
		}
		chatSocket.send(
			`chat${MSG_DELIM}${props.gameCode}${MSG_DELIM}${props.pubKey}${MSG_DELIM}${message}${MSG_DELIM}${props.isBlack}${MSG_DELIM}${props.isWhite}`
		);
		setMessageText("");
	};
	console.log("messages = ", messages);
	if (!opened) {
		return (
			<>
				<div
					onClick={() => {
						setOpened(true);
					}}
					className="fixed bottom-10 right-10 bg-b2  p-5 text-white rounded-full flex-row flex cursor-pointer justify-center"
				>
					<img src={"/assets/chat.png"} />
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="fixed bottom-10 right-10 bg-b2 rounded-xl h-500">
					<div
						onClick={() => {
							setOpened(false);
						}}
						className=" bg-b2 w-400 p-3 text-white rounded-xl flex-row flex justify-between h-50 cursor-pointer content-center items-center"
					>
						<p className="text-base font-medium ml-3">Chat</p>
						<span className="text-lg font-medium font-bold text-primary mr-3">
							x
						</span>
					</div>
					<div className="h-2 bg-dark"></div>
					<div className="bg-dark w-400 p-4 text-white flex-col-reverse flex h-390 overflow-y-scroll scrollbar-hide gap-2">
						{messages.map((x, i) => {
							console.log(x, i);
							return (
								<Message
									pubKey={x.pubKey}
									isWhite={x.isWhite}
									isBlack={x.isBlack}
									message={x.message}
									placeholder={placeholder}
								></Message>
							);
						})}
					</div>
					<div className="flex flex-row content-center items-center justify-center gap-2 p-1">
						<input
							type="text"
							className="bg-b1 mt-0.5 appearance-none text-white rounded-xl py-2 px-4 opacity-80 leading-tight focus:outline-none w-4/5"
							value={messageText}
							onChange={(e) => {
								setMessageText(e.target.value);
							}}
						/>
						<span
							className="p-1 pl-2.5 pr-2.5 mt-0.5 bg-primary text-white rounded cursor-pointer"
							onClick={() => {
								sendMessage(messageText);
							}}
						>
							{">"}
						</span>
					</div>
				</div>
			</>
		);
	}
};

export default Chat;
