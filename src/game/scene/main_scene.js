import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Pawn from "./models/pawn";
extend({ OrbitControls });

function Box(props) {
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	//useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			position={props.position}
			ref={mesh}
			scale={1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial
				color={
					props.row == 0 && props.col == 0
						? "grey"
						: (props.row + props.col) % 2 === 0
						? "black"
						: "white"
				}
			/>
		</mesh>
	);
}

const Board = () => {};

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
	let gltf = useLoader(GLTFLoader, "/assets/models/Pawn.glb");
	//et gltf1 = gltf.clone();
	//let gltf2 = gltf.nodes.clone();
	//let gltf3 = gltf.clone();

	return (
		<Suspense fallback={<></>}>
			<Canvas
				gl={{ antialias: true }}
				dpr={Math.max(window.devicePixelRatio, 2)}
			>
				<CameraControls />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				{[...Array(8)].map((x, i) => {
					return [...Array(8)].map((y, j) => {
						return (
							<>
								<Box
									position={[i - 4.5, j - 4.5, 0]}
									row={i}
									col={j}
								/>
								<Pawn row={i} col={j} />
							</>
						);
					});
				})}
			</Canvas>
		</Suspense>
	);
};

export default Chess;
