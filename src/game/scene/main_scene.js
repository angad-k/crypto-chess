import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Piece, { Models } from "./piece";
import Board from "./board";
import Setup from "./setup";
import initialPositions from "./positions";
import { useEffect } from "react/cjs/react.development";
import { Game, move, status, moves, aiMove, getFen } from "js-chess-engine";
import { getCoordsFromNotation } from "./coordutils";
import { Colors } from "./utils";
import { Environment } from "@react-three/drei";
extend({ OrbitControls });

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
		/>
	);
};

const Chess = (props) => {
	const [positions, setPositions] = useState(initialPositions);
	const [activeBlocks, setActiveBlocks] = useState([]);
	const [selectedPiece, setSelectedPiece] = useState();
	const [blackSideCoord, setBlackSideCoord] = useState([0, -1]);
	const [whiteSideCoord, setWhiteSideCoord] = useState([0, 8]);
	const [game, setGame] = useState();
	const [gameEnded, setGameEnded] = useState(false);
	const [winner, setWinner] = useState();
	if (!game) {
		let g = new Game();
		setGame(g);
	}
	const handlePieceClick = (n) => {
		let moves = game.moves(n);
		let aB = moves.map((x, i) => {
			return getCoordsFromNotation(x);
		});
		setActiveBlocks(aB);
		setSelectedPiece(n);
	};
	const performMove = (from, to) => {
		const fromCoordinates = getCoordsFromNotation(selectedPiece);
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
					setWhiteSideCoord(nws);
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
					setBlackSideCoord(bws);
				}
			} else if (x.i == fromCoordinates[0] && x.j == fromCoordinates[1]) {
				x.i = toCoordinates[0];
				x.j = toCoordinates[1];
			}
			return x;
		});
		//console.log(newpositions);
		setPositions(newpositions);
		setSelectedPiece(null);
		setActiveBlocks([]);
		game.move(from, to);
		let json = game.exportJson();
		if (json["check"]) {
			console.log("check");
		}
		if (json["checkMate"]) {
			console.log("checkMate");
			setGameEnded(true);
			if (json["turn"] == "black") {
				setWinner("White");
			} else {
				setWinner("Black");
			}
		}
	};
	const handleBlockClick = (n) => {
		performMove(selectedPiece, n);
	};

	if (gameEnded) {
		return (
			<div style={{ height: "100vh", width: "100%" }}>
				Khatam Tata Bye Bye
				<br></br>
				{winner} Wins.
			</div>
		);
	}
	return (
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
						props.player == Colors.BLACK ? Math.PI : 0,
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
					/>
					<Setup
						positions={positions}
						handlePieceClick={handlePieceClick}
					/>
				</group>
			</Canvas>
		</Suspense>
	);
};

export default Chess;
