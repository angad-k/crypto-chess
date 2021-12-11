import { MSG_DELIM, splitMessage } from "./utils/utils";

const url = "ws://localhost:4000";

let onopenCalled = false;

export class SocketInteraction {
  constructor(gameCode, pubKey, isHost, colorCallback, opponentMoveCallback) {
    console.log("constructor called")
    this.s = new WebSocket(url);
    this.gameCode = gameCode;
    onopenCalled = false;
    this.s.onopen = () => {
      console.log(this.onopenCalled);
      if(!onopenCalled)
      {
        onopenCalled = true;
        console.log("onopen called")
        if (isHost) {
          this.s.send(
            `new_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
          );
        } else {
          this.s.send(
            `join_game${MSG_DELIM}${pubKey}${MSG_DELIM}${this.gameCode}`
          );
        }
        
      }
      
    };
    this.s.onmessage = (event) => {
      console.log("something called");
      let msg = event.data;
      let [cmd, arg] = splitMessage(msg);
      switch (cmd) {
        case "color": {
          console.log("color callback : " + arg)
          colorCallback(arg);
          break;
        }
        case "opponent_move": {
          console.log("opponent_move from " + from + " to " + to)
          let [from, to] = splitMessage(arg);
          opponentMoveCallback(from, to);
          break;
        }
      }
    };
  }
  makeMove(from, to) {
    console.log("yahan move hua from " + from + " to  " + to)
    this.s.send(`move${MSG_DELIM}${from}${MSG_DELIM}${to}`);
  }
}
