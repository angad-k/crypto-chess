import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Piece, { Models } from "./piece";
import Board from "./board";
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
	return (
		<Suspense fallback={<></>}>
			<Canvas
				gl={{ antialias: true }}
				dpr={Math.max(window.devicePixelRatio, 2)}
			>
				<CameraControls />
				<ambientLight />
				<pointLight position={[4.5, 4.5, 10]} />
				<pointLight position={[-4.5, -4.5, 10]} />
				<pointLight position={[4.5, -4.5, 10]} />
				<pointLight position={[-4.5, 4.5, 10]} />
				<Board />
				{[...Array(6)].map((x, i) => {
					return <Piece row={i} col={0} side={0} model={i} />;
				})}
			</Canvas>
		</Suspense>
	);
};

export default Chess;
