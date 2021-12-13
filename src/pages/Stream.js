import TopNav from "../components/TopNav";
import Chess from "../game/scene/main_scene";
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Store from "../utils/Store";
import { Models } from "../game/scene/piece";
import { Colors } from "../game/scene/utils";
import {
  getRandomChessImagePath,
  MSG_DELIM,
  splitMessage,
} from "../utils/utils";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import Board from "../game/scene/board";
import Setup from "../game/scene/setup";
import { getCoordsFromNotation } from "../game/scene/coordutils";
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableDamping={true}
      enablePan={false}
    />
  );
};
const url = "ws://localhost:4000";
let s = new WebSocket(url);
let onopenCalled = false;
// const currPos = [];
const Stream = (props) => {
    const [pos_set, setpos_set] = useState(false);
  const { chess, setChess, resetChessStore } = useContext(Store);
  const {
    positions,
    activeBlocks,
    selectedPiece,
    blackSideCoord,
    whiteSideCoord,
    game,
    gameEnded,
    gameStarted,
    winner,
    playerColor,
  } = chess;
  useEffect(() => {
    return resetChessStore;
  }, []);

  const performMove = (from, to, aiDone = false) => {
    const fromCoordinates = getCoordsFromNotation(from);
    const toCoordinates = getCoordsFromNotation(to);
    let newpositions = positions.map((x, i) => {
      if (x.i == toCoordinates[0] && x.j == toCoordinates[1]) {
        if (x.side == Colors.WHITE) {
          x.i = whiteSideCoord[0];
          x.j = whiteSideCoord[1];
          x.alive = false;
          let nws = whiteSideCoord;
          if (nws[0] == 7) {
            nws[1] = 9;
            nws[0] = 0;
          } else {
            nws[0]++;
          }
          setChess({ whiteSideCoord: nws });
        } else {
          x.i = blackSideCoord[0];
          x.j = blackSideCoord[1];
          x.alive = false;
          let bws = blackSideCoord;
          if (bws[0] == 7) {
            bws[1] = -2;
            bws[0] = 0;
          } else {
            bws[0]++;
          }
          setChess({ blackSideCoord: bws });
        }
      } else if (x.i === fromCoordinates[0] && x.j === fromCoordinates[1]) {
        x.i = toCoordinates[0];
        x.j = toCoordinates[1];
      }
      return x;
    });
      console.log(newpositions);
    setChess({
      positions: newpositions,
      selectedPiece: null,
      activeBlocks: [],
    });
  };

  const params = useParams();

  function updateBoard(fen) {
    let currPos = [];
    let rows = fen.split(" ")[0].split("/");
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        console.log(rows[i]);
        if (rows[i][j] == "r" || rows[i][j] == "r") {
          currPos.push({
            i: i,
            j: j,
            model: Models.ROOK,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "n" || rows[i][j] == "n") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KNIGHT,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "b" || rows[i][j] == "b") {
          currPos.push({
            i: i,
            j: j,
            model: Models.BISHOP,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "q" || rows[i][j] == "q") {
          currPos.push({
            i: i,
            j: j,
            model: Models.QUEEN,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "k" || rows[i][j] == "k") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KING,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "p" || rows[i][j] == "p") {
          console.log(true);
          currPos.push({
            i: i,
            j: j,
            model: Models.PAWN,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[i][j] == "R" || rows[i][j] == "R") {
          currPos.push({
            i: i,
            j: j,
            model: Models.ROOK,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[i][j] == "N" || rows[i][j] == "N") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KNIGHT,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[i][j] == "B" || rows[i][j] == "B") {
          currPos.push({
            i: i,
            j: j,
            model: Models.BISHOP,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[i][j] == "Q" || rows[i][j] == "Q") {
          currPos.push({
            i: i,
            j: j,
            model: Models.QUEEN,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[i][j] == "K" || rows[i][j] == "K") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KING,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[i][j] == "P" || rows[i][j] == "P") {
          currPos.push({
            i: i,
            j: j,
            model: Models.PAWN,
            side: Colors.WHITE,
            alive: true,
          });
        } else {
          j += parseInt(rows[i][j]) - 1;
        }
      }
    }
    setChess({
      positions: currPos,
    });
      setpos_set(true);
      console.log(currPos);
  }
  s.onopen = () => {
    if (!onopenCalled) {
      onopenCalled = true;
      console.log("onopen called");
      s.send(`get_game${MSG_DELIM}${params.gameCode}`);
      console.log(`get_game${MSG_DELIM}${params.gameCode}`);
    }
  };
  s.onmessage = (event) => {
    console.log("meet-log:", event);
    let msg = event.data;
    let [cmd, arg] = splitMessage(msg);
    switch (cmd) {
      case "stream":
            let [gameCode, move] = splitMessage(msg);
            console.log(gameCode + ":" + move);
        // if (params.gameCode == gameCode) {
            let [from, to] = splitMessage(move);
            console.log(true);
            performMove(from, to);
        // }
        break;
      case "init_game":
        //set board
        let [gc, fen] = splitMessage(arg);
        if (gc == params.gameCode) {
          updateBoard(fen);
          console.log(fen);
          console.log(positions);
        }
        break;
      default:
    }
  };
  return (
    <Suspense fallback={<></>}>
      <Canvas
        gl={{ antialias: true }}
        dpr={Math.max(window.devicePixelRatio, 2)}
      >
        <CameraControls />
        <group>
          <ambientLight />
          <pointLight position={[4.5, 4.5, 20]} />
          <pointLight position={[-4.5, -4.5, 20]} />
          <pointLight position={[4.5, -4.5, 20]} />
          <pointLight position={[-4.5, 4.5, 20]} />
          <Board active={[]} handleBlockClick={() => {}} playerColor={0} />
          <Setup
                positions={pos_set ? positions : []}
            handlePieceClick={() => {}}
            playerColor={0}
          />
        </group>
      </Canvas>
    </Suspense>
  );
};

export default Stream;
