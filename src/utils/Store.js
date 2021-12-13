import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import initialPositions from "../game/scene/positions";
import { Game } from "js-chess-engine";

const initialChessStore = {
  positions: initialPositions,
  activeBlocks: [],
  selectedPiece: null,
  blackSideCoord: [0, -1],
  whiteSideCoord: [0, 8],
  game: new Game(),
  gameEnded: false,
  gameStarted: false,
  winner: null,
  playerColor: null,
};
const initialStreamPubkeys = {
  white:null,
  black:null
};
class Store {
  constructor() {
    makeAutoObservable(this);
  }

  user = {};
  chess = initialChessStore;
  streamPubkeys = initialStreamPubkeys;
  setUser = (user) => {
    this.user = user;
  };

  setChess = (chess) => {
    const old_chess = this.chess;
    this.chess = { ...old_chess, ...chess };
  };
  setStreamPubkeys = (streamPubkeys) =>{
    const old_keys = this.streamPubkeys;
    this.streamPubkeys = { ...old_keys, ...streamPubkeys };
  }
  resetStreamPubkeys = () => {
    this.streamPubkeys = initialStreamPubkeys;
  };
  resetChessStore = () => {
    this.chess = initialChessStore;
  };
}

export default createContext(new Store());
