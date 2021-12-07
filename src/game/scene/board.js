import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera, MeshLambertMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
function Box(props) {
	const mesh = useRef();
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
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
					hovered
						? "grey"
						: (props.row + props.col) % 2 === 0
						? "black"
						: "white"
				}
			/>
		</mesh>
	);
}
const Board = () => {
	return [...Array(8)].map((x, i) => {
		return [...Array(8)].map((y, j) => {
			return (
				<>
					<Box position={[i - 4.5, j - 4.5, 0]} row={i} col={j} />
				</>
			);
		});
	});
};

export default Board;
