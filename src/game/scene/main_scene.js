import React, { useRef, Suspense, useContext, useEffect } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Board from "./board";
import Setup from "./setup";
import { Game } from "js-chess-engine";
import { getCoordsFromNotation } from "./coordutils";
import { Colors } from "./utils";
import Loader from "react-loader-spinner";
import {
	getRandomChessImagePath,
	MSG_DELIM,
	splitMessage,
} from "../../utils/utils";
import Store from "../../utils/Store";
import { observer } from "mobx-react-lite";
import WaitingPage from "../../pages/WaitingPage";
import WinLostPage from "../../pages/WinLostPage";
import Chat from "../../components/Chat";
import { Color } from "three";
import { webSocketURL } from "../../utils/const";

extend({ OrbitControls });
const url = webSocketURL;
let onopenCalled = false;
let interactionSocket;
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
const Chess = (props) => {
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
	if (!game) {
		let g = new Game();
		setChess({ game: g });
	}
	const colorCallback = (c) => {
		setChess({ playerColor: parseInt(c), gameStarted: true });
	};

	const handlePieceClick = (n) => {
		if (!props.isBetting) {
			let moves = game.moves(n);
			let aB = moves.map((x, i) => {
				return getCoordsFromNotation(x);
			});
			setChess({ activeBlocks: aB, selectedPiece: n });
		}
	};

	const performMove = (from, to, aiDone = false) => {
		console.log(game + "," + from + to + aiDone);
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
			} else if (
				x.i === fromCoordinates[0] &&
				x.j === fromCoordinates[1]
			) {
				x.i = toCoordinates[0];
				x.j = toCoordinates[1];
			}
			return x;
		});

		setChess({
			positions: newpositions,
			selectedPiece: null,
			activeBlocks: [],
		});

		if (!aiDone) {
			game.move(from, to);
		}

		let json = game.exportJson();

		if (json["check"]) {
			console.log("check");
		}

		if (json["checkMate"]) {
			setChess({ gameEnded: true });
			if (json["turn"] === "black") {
				setChess({ winner: Colors.WHITE });
			} else {
				setChess({ winner: Colors.BLACK });
			}
		}
	};

	if (!interactionSocket && !props.practiceGame) {
		/*let intsoc =interactionSocket new SocketInteraction(
			props.gameCode,
			props.pubKey,
			props.isHost,
			colorCallback,
			performMove
		);
		setInteractionSocket(intsoc);*/
		let s = new WebSocket(url);
		s.onopen = () => {
			if (!onopenCalled) {
				onopenCalled = true;
				console.log("onopen called");
				if (props.isBetting) {
					s.send(
						`betting${MSG_DELIM}${props.pubKey}${MSG_DELIM}${props.gameCode}`
					);
					setChess({ gameStarted: true });
				} else if (props.isHost) {
					s.send(
						`new_game${MSG_DELIM}${props.pubKey}${MSG_DELIM}${props.gameCode}`
					);
				} else {
					s.send(
						`join_game${MSG_DELIM}${props.pubKey}${MSG_DELIM}${props.gameCode}`
					);
				}
			}
		};
		s.onmessage = (event) => {
			console.log("game", game);
			console.log("something called", event);
			let msg = event.data;
			let [cmd, arg] = splitMessage(msg);
			switch (cmd) {
				case "color": {
					console.log("color callback : " + arg);
					colorCallback(arg);
					break;
				}
				case "opponent_move": {
					let [from, to] = splitMessage(arg);
					console.log("opponent_move from " + from + " to " + to);
					if (game.moves(from).includes(to)) {
						performMove(from, to);
					}
					break;
				}
				default: {
					//do nothing
				}
			}
		};
		interactionSocket = s;
	}

	if (props.practiceGame && !gameStarted) {
		setChess({ gameStarted: true, playerColor: Colors.WHITE });
	}

	const handleBlockClick = (n) => {
		if (!props.isBetting) {
			performMove(selectedPiece, n);
			if (!props.practiceGame) {
				interactionSocket.send(
					`move${MSG_DELIM}${props.gameCode}${MSG_DELIM}${selectedPiece}${MSG_DELIM}${n}`
				);
			} else {
				let m = game.aiMove();
				for (var from in m) {
					if (m.hasOwnProperty(from)) {
						performMove(from, m[from], true);
					}
				}
			}
		}
	};

	if (!gameStarted) {
		return <WaitingPage />;
	}

	if (gameEnded) {
		if (props.isBetting) {
			return (
				<WinLostPage
					title={`${
						winner === Colors.BLACK ? "Black" : "White"
					} won.`}
				/>
			);
		}
		if (playerColor === winner) {
			return <WinLostPage title="You Win. Reward Amount transferred" />;
		} else {
			return <WinLostPage title="You Lost." />;
		}
	}

	return (
		<>
			<Suspense fallback={<></>}>
				<Canvas
					gl={{ antialias: true }}
					dpr={Math.max(window.devicePixelRatio, 2)}
				>
					<CameraControls />
					<group
						rotation={[
							0,
							0,
							playerColor === Colors.BLACK ? Math.PI : 0,
						]}
					>
						<ambientLight />
						<pointLight position={[4.5, 4.5, 20]} />
						<pointLight position={[-4.5, -4.5, 20]} />
						<pointLight position={[4.5, -4.5, 20]} />
						<pointLight position={[-4.5, 4.5, 20]} />
						<Board
							active={activeBlocks}
							handleBlockClick={handleBlockClick}
							playerColor={playerColor}
						/>
						<Setup
							positions={positions}
							handlePieceClick={handlePieceClick}
							playerColor={playerColor}
						/>
					</group>
				</Canvas>
			</Suspense>
			<div className="fixed bottom-10 right-10 ">
				<Chat
					pubKey={props.pubKey}
					gameCode={props.gameCode}
					isBlack={playerColor == Colors.BLACK}
					isWhite={playerColor == Colors.WHITE}
				/>
			</div>
		</>
	);
};

export default observer(Chess);
