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
extend({ OrbitControls });

const CameraControls = () => {
	const {
		camera,
		gl: { domElement },
	} = useThree();
	const controls = useRef();
	useFrame((state) => controls.current.update());
	return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const Chess = () => {
	const [positions, setPositions] = useState(initialPositions);
	const [activeBlocks, setActiveBlocks] = useState([]);
	const [selectedPiece, setSelectedPiece] = useState();
	const [game, setGame] = useState();
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
	const handleBlockClick = (n) => {
		game.move(selectedPiece, n);
		const fromCoordinates = getCoordsFromNotation(selectedPiece);
		const toCoordinates = getCoordsFromNotation(n);
		let newpositions = positions
			.filter((x, i) => {
				if (x.i == toCoordinates[0] && x.j == toCoordinates[1]) {
					console.log("udaya");
					return false;
				}
				return true;
			})
			.map((x, i) => {
				if (x.i == fromCoordinates[0] && x.j == fromCoordinates[1]) {
					x.i = toCoordinates[0];
					x.j = toCoordinates[1];
					console.log("badal");
				}
				return x;
			});
		console.log(newpositions);
		setPositions(newpositions);
		setSelectedPiece(null);
		setActiveBlocks([]);
	};
	return (
		<Suspense fallback={<></>}>
			<Canvas
				gl={{ antialias: true }}
				dpr={Math.max(window.devicePixelRatio, 2)}
			>
				<CameraControls />
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
			</Canvas>
		</Suspense>
	);
};

export default Chess;
