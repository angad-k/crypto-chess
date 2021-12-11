import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import initialPositions from "../game/scene/positions";

const initialChessStore = {
  positions: initialPositions,
  activeBlocks: [],
  selectedPiece: null,
  blackSideCoord: [0, -1],
  whiteSideCoord: [0, 8],
  game: null,
  gameEnded: false,
  gameStarted: false,
  winner: null,
  playerColor: null,
};

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  user = {};
  chess = initialChessStore;

  setUser = (user) => {
    this.user = user;
  };

  setChess = (chess) => {
    const old_chess = this.chess;
    this.chess = { ...old_chess, ...chess };
  };

  resetChessStore = () => {
    this.chess = initialChessStore;
  };
}

export default createContext(new Store());
