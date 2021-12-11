import { MSG_DELIM, splitMessage } from "./utils/utils";

const url = "ws://localhost:4000";
let onopenCalled = false;
export class SocketInteraction {
	constructor(gameCode, pubKey, isHost, colorCallback, opponentMoveCallback) {
		this.s = new WebSocket(url);
		this.gameCode = gameCode;
		onopenCalled = false;
		this.s.onopen = () => {
			if (!onopenCalled) {
				if (isHost) {
					this.s.send(
						`new_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
					);
				} else {
					this.s.send(
						`join_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
					);
				}
        onopenCalled=true;
			}
		};
		this.s.onmessage = (event) => {
			let msg = event.data;
			let [cmd, arg] = splitMessage(msg);
			switch (cmd) {
				case "color": {
					colorCallback(arg);
					break;
				}
				case "opponent_move": {
					let [from, to] = splitMessage(arg);
					opponentMoveCallback(from, to);
					break;
				}
			}
		};
	}
	makeMove(from, to) {
		this.s.send(`move${MSG_DELIM}${this.gameCode}${MSG_DELIM}${from}${MSG_DELIM}${to}`);
	}
}
