import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Pawn = (props) => {
	let gltf = useLoader(GLTFLoader, "/assets/models/Pawn.glb");
	const [gltfGeometry, setGltfGeometry] = useState();
	const [pos, setPos] = useState({ i: -100, j: -100 });
	if (!gltfGeometry) {
		const gltfScene = gltf.scene.clone(true);
		setGltfGeometry(gltfScene);
	}
	if (pos.i < 0) {
		const newPos = { i: props.row, j: props.col };
		setPos(newPos);
	}

	const gltfProps = {
		object: gltfGeometry,
		position: [-4.5 - 0.43 + pos.i, -4.5 + 0.43 + pos.j, 0.5],
		rotation: [-Math.PI, 0, 0],
		scale: 0.035,
	};
	return <primitive {...gltfProps} object={gltfGeometry} />;
};
export default Pawn;
