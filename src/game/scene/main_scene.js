import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera } from "three";

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
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial
				color={
					hovered
						? "grey"
						: (props.row + props.col) % 2 == 0
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
	return (
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
						<Box position={[i - 4.5, j - 4.5, 0]} row={i} col={j} />
					);
				});
			})}
		</Canvas>
	);
};

export default Chess;
