import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera, MeshLambertMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { act } from "react-dom/test-utils";
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
					props.active
						? "green"
						: (props.row + props.col) % 2 === 0
						? "black"
						: "white"
				}
			/>
		</mesh>
	);
}
const Board = (props) => {
	return [...Array(8)].map((x, i) => {
		return [...Array(8)].map((y, j) => {
			let active = false;
			props.active.forEach((p, q) => {
				if (p[0] == i && p[1] == j) {
					active = true;
				}
			});
			return (
				<>
					<Box
						position={[i - 4.5, j - 4.5, 0]}
						row={i}
						col={j}
						active={active}
					/>
				</>
			);
		});
	});
};

export default Board;
