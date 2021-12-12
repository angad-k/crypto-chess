import TopNav from "../components/TopNav";
import Chess from "../game/scene/main_scene";
import React, { Suspense, useContext, useRef } from "react";
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
const currPos = [];
let s = new WebSocket(url);
let onopenCalled = false;
const Stream = (props) => {
  const params = useParams();

  function updateBoard(fen) {
    let rows = fen.split(" ")[0].split("/");
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length(); j++) {
        if (rows[j] == "r" || rows[j] == "r") {
          currPos.push({
            i: i,
            j: j,
            model: Models.ROOK,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "n" || rows[j] == "n") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KNIGHT,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "b" || rows[j] == "b") {
          currPos.push({
            i: i,
            j: j,
            model: Models.BISHOP,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "q" || rows[j] == "q") {
          currPos.push({
            i: i,
            j: j,
            model: Models.QUEEN,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "k" || rows[j] == "k") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KING,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "p" || rows[j] == "p") {
          currPos.push({
            i: i,
            j: j,
            model: Models.PAWN,
            side: Colors.BLACK,
            alive: true,
          });
        } else if (rows[j] == "R" || rows[j] == "R") {
          currPos.push({
            i: i,
            j: j,
            model: Models.ROOK,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[j] == "N" || rows[j] == "N") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KNIGHT,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[j] == "B" || rows[j] == "B") {
          currPos.push({
            i: i,
            j: j,
            model: Models.BISHOP,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[j] == "Q" || rows[j] == "Q") {
          currPos.push({
            i: i,
            j: j,
            model: Models.QUEEN,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[j] == "K" || rows[j] == "K") {
          currPos.push({
            i: i,
            j: j,
            model: Models.KING,
            side: Colors.WHITE,
            alive: true,
          });
        } else if (rows[j] == "P" || rows[j] == "P") {
          currPos.push({
            i: i,
            j: j,
            model: Models.PAWN,
            side: Colors.WHITE,
            alive: true,
          });
        } else {
          j += parseInt(rows[i]) - 1;
        }
      }
    }
  }
  s.onopen = () => {
    if (!onopenCalled) {
      onopenCalled = true;
      console.log("onopen called");
      s.send(`get_game${MSG_DELIM}${params.gameCode}`);
    }
  };
  s.onmessage = (event) => {
    console.log("meet-log:", event);
    let msg = event.data;
    let [cmd, arg] = splitMessage(msg);
    switch (cmd) {
      case "stream":
        let [gameCode, move] = splitMessage(msg);
        if (params.gameCode == gameCode) {
          let [from, to] = splitMessage(move);
        }
        break;
      case "init_game":
        //set board
        let [gc, fen] = splitMessage(arg);
        if (gc == params.gameCode) {
          updateBoard(fen);
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
          <Board
            active={() => {}}
            handleBlockClick={() => {}}
            playerColor={() => {}}
          />
          <Setup
            positions={currPos}
            handlePieceClick={() => {}}
            playerColor={0}
          />
        </group>
      </Canvas>
    </Suspense>
  );
};

export default Stream;
