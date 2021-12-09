import { MSG_DELIM, splitMessage } from "./utils";

const url = "test";

export class SocketInteraction {
	constructor(gameCode, colorCallback, opponentMoveCallback) {
		this.s = new WebSocket(url);
		this.gameCode = gameCode;
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
	newGame(pubKey) {
		this.s.send(
			`new_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
		);
	}
	joinGame(pubKey) {
		this.s.send(
			`join_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
		);
	}
	makeMove(from, to) {
		this.s.send(`move${MSG_DELIM}${from}${MSG_DELIM}${to}`);
	}
}
