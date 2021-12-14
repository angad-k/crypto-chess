import React, { useState } from "react";
import { truncatePubKey } from "../utils/utils";

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
	const [opened, setOpened] = useState(false);
	let messages = [
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68",
			message: "hi",
			isBlack: false,
			isWhite: false,
		},
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68",
			message: "hi",
			isBlack: false,
			isWhite: false,
		},
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68",
			message: "hi",
			isBlack: false,
			isWhite: false,
		},
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68",
			message: "hi",
			isBlack: false,
			isWhite: false,
		},
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68",
			message: "hello",
			isBlack: true,
			isWhite: false,
		},
		{
			pubKey: "0x086afEGFWGsdGRGGSGdfwqrt3gsde68a",
			message: "hello \n hi \n i am angad",
			isBlack: false,
			isWhite: true,
		},
	];
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
						className=" bg-b2 w-400 p-3 text-white rounded-xl flex-row flex justify-center h-50 cursor-pointer"
					>
						<p className="text-sm font-medium">Chat</p>
					</div>
					<div className="h-2 bg-dark"></div>
					<div className="bg-dark w-400 p-4 text-white flex-col-reverse flex h-390 overflow-y-scroll scrollbar-hide gap-2">
						{messages.map((x, i) => {
							return (
								<Message
									pubKey={x.pubKey}
									isWhite={x.isWhite}
									isBlack={x.isBlack}
									message={x.message}
								></Message>
							);
						})}
					</div>
					<div className="flex flex-row content-center items-center justify-center gap-2 p-1">
						<input
							type="text"
							className="bg-b1 mt-0.5 appearance-none text-white rounded-xl py-2 px-4 opacity-80 leading-tight focus:outline-none w-4/5"
						/>
						<span className="p-1 pl-2.5 pr-2.5 mt-0.5 bg-primary text-white rounded cursor-pointer">
							{">"}
						</span>
					</div>
				</div>
			</>
		);
	}
};

export default Chat;
