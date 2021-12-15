import TopNav from "../components/TopNav";
import PlayerLeft from "../components/PlayerLeft";
import PlayerRight from "../components/PlayerRight";
import Chess from "../game/scene/main_scene";
import React, {
	Suspense,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import Store from "../utils/Store";
import { Models } from "../game/scene/piece";
import { Colors } from "../game/scene/utils";
import {
	getRandomChessImagePath,
	MSG_DELIM,
	splitMessage,
} from "../utils/utils";
import { observer } from "mobx-react-lite";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import Board from "../game/scene/board";
import Setup from "../game/scene/setup";
import { getCoordsFromNotation } from "../game/scene/coordutils";
import { ethers } from "ethers";
import BettingPanel from "./BettingPanel";
import { webSocketURL } from "../utils/const";
import Chat from "../components/Chat";
import ModalSuperChat from "../components/ModalSuperChat";
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
const url = webSocketURL;
let s = new WebSocket(url);
let onopenCalled = false;
// const currPos = [];
const Stream = observer((props) => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const params = useParams();
	const { user } = useContext(Store);
	const [placeholder, setPlaceholder] = useState(false);
	const [pos_set, setpos_set] = useState(false);
	const [reloaded, setReloaded] = useState(false);
	const { chess, setChess, resetChessStore } = useContext(Store);
	const { streamPubkeys, setStreamPubkeys, resetStreamPubkeys } =
		useContext(Store);
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
	const { whitePubkey, blackPubkey } = streamPubkeys;
	useEffect(() => {
		return resetStreamPubkeys;
	}, []);
	const performMove = (from, to, aiDone = false) => {
		const fromCoordinates = getCoordsFromNotation(from);
		console.log("fromC = " + fromCoordinates);
		const toCoordinates = getCoordsFromNotation(to);
		console.log("toC = " + toCoordinates);
		let newpositions = positions.map((x, i) => {
			if (x.i == toCoordinates[0] && x.j == toCoordinates[1]) {
				console.log("udaya");
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
			} else if (
				x.i === fromCoordinates[0] &&
				x.j === fromCoordinates[1]
			) {
				console.log("hilaya");
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
		setPlaceholder(!placeholder);
	};

	function updateBoard(fen) {
		let currPos = [];
		let rows = fen.split(" ")[0].split("/");
		console.log(rows);
		for (let i = 0; i < rows.length; i++) {
			let I = 0;
			for (let j = 0; j < rows[i].length; j++) {
				console.log("rows = " + rows[i]);
				console.log("rows[i][j] = " + rows[i][j]);
				if (rows[i][j] == "r" || rows[i][j] == "r") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.ROOK,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "n" || rows[i][j] == "n") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.KNIGHT,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "b" || rows[i][j] == "b") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.BISHOP,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "q" || rows[i][j] == "q") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.QUEEN,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "k" || rows[i][j] == "k") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.KING,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "p" || rows[i][j] == "p") {
					console.log(true);
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.PAWN,
						side: Colors.BLACK,
						alive: true,
					});
				} else if (rows[i][j] == "R" || rows[i][j] == "R") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.ROOK,
						side: Colors.WHITE,
						alive: true,
					});
				} else if (rows[i][j] == "N" || rows[i][j] == "N") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.KNIGHT,
						side: Colors.WHITE,
						alive: true,
					});
				} else if (rows[i][j] == "B" || rows[i][j] == "B") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.BISHOP,
						side: Colors.WHITE,
						alive: true,
					});
				} else if (rows[i][j] == "Q" || rows[i][j] == "Q") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.QUEEN,
						side: Colors.WHITE,
						alive: true,
					});
				} else if (rows[i][j] == "K" || rows[i][j] == "K") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.KING,
						side: Colors.WHITE,
						alive: true,
					});
				} else if (rows[i][j] == "P" || rows[i][j] == "P") {
					currPos.push({
						i: I,
						j: 7 - i,
						model: Models.PAWN,
						side: Colors.WHITE,
						alive: true,
					});
				} else {
					console.log("skipping by " + (Number(rows[i][j]) - 1));
					I += Number(rows[i][j]) - 1;
				}
				I++;
			}
		}
		//currPos = farSpawn(currPos);
		setChess({
			positions: currPos,
		});
		setPlaceholder(!placeholder);
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
				let [gameCode, move] = splitMessage(arg);
				console.log(gameCode + ":" + move);
				// if (params.gameCode == gameCode) {
				let [from, to] = splitMessage(move);
				console.log(
					"gamecode = " + gameCode + " from = " + from + " to = " + to
				);
				//console.log(true);
				performMove(from, to);
				/*
				let [gc, fen] = splitMessage(arg);
				if (gc == params.gameCode) {
					updateBoard(fen);
					console.log(fen);
					console.log(positions);
					console.log("message aya");
					//window.location.reload();
				}*/
				break;
			case "init_game":
				//set board
				let [gg, extra] = splitMessage(arg);
				let [f, extra2] = splitMessage(extra);
				let [white, black] = splitMessage(extra2);
				if (gg == params.gameCode) {
					updateBoard(f);
					console.log(white, black);
					setStreamPubkeys({
						whitePubkey: white,
						blackPubkey: black,
					});
					console.log(f);
					console.log(positions);
					console.log(whitePubkey, blackPubkey);
				}
				break;
			default:
		}
	};
	console.log("rendered");
	console.log("positions = ");
	console.log(positions);
	console.log(whitePubkey, blackPubkey);
	return (
		<>
			<div className="bg-dark h-screen overflow-auto">
				<TopNav />
				<PlayerLeft pubKey={whitePubkey} />
				<PlayerRight pubKey={blackPubkey} />
				<div className="h-screen">
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
									active={[]}
									handleBlockClick={() => {}}
									playerColor={0}
								/>
								<Setup
									positions={pos_set ? positions : []}
									handlePieceClick={() => {}}
									playerColor={playerColor}
								/>
							</group>
						</Canvas>
					</Suspense>
				</div>
			</div>
			<div className="fixed bottom-10 right-10 flex flex-col gap-3 ">
				<Chat
					pubKey={user.accounts}
					gameCode={params.gameCode}
					isBlack={false}
					isWhite={false}
					setShowModal={setShowModal}
				/>
				<BettingPanel
					whitePubkey={whitePubkey}
					blackPubkey={blackPubkey}
					gameCode={params.gameCode}
				/>
			</div>
			{showModal ? (
				<ModalSuperChat
					closeModal={handleCloseModal}
					whitePubkey={whitePubkey}
					blackPubkey={blackPubkey}
				/>
			) : (
				<> </>
			)}
		</>
	);
});

export default Stream;
