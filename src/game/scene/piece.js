import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera, MeshLambertMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Models = {
	PAWN: 0,
	QUEEN: 1,
	ROOK: 2,
	BISHOP: 3,
	KNIGHT: 4,
	KING: 5,
};

const getPath = (model) => {
	switch (model) {
		case Models.PAWN:
			return "/assets/models/Pawn.glb";
		case Models.QUEEN:
			return "/assets/models/Queen.glb";
		case Models.ROOK:
			return "/assets/models/Rook.glb";
		case Models.BISHOP:
			return "/assets/models/Bishop.glb";
		case Models.KING:
			return "/assets/models/King.glb";
		case Models.KNIGHT:
			return "/assets/models/Knight.glb";
	}
};

const getOffset = (model) => {
	switch (model) {
		case Models.PAWN:
			return {
				x: -0.43,
				y: 0.43,
			};
		case Models.QUEEN:
			return {
				x: -2,
				y: 0.35,
			};
		case Models.ROOK:
			return {
				x: -0.35,
				y: 0.35,
			};
		case Models.BISHOP:
			return {
				x: -0.43,
				y: 0.43,
			};
		case Models.KING:
			return {
				x: -0.4,
				y: 0.35,
			};
		case Models.KNIGHT:
			return {
				x: -0.38,
				y: 0.4,
			};
	}
};

const getScale = (model) => {
	switch (model) {
		case Models.PAWN:
			return 0.035;
		case Models.QUEEN:
			return 0.025;
		case Models.ROOK:
			return 0.025;
		case Models.BISHOP:
			return 0.028;
		case Models.KING:
			return 0.025;
		case Models.KNIGHT:
			return 0.025;
	}
};

const Piece = (props) => {
	const [hovered, setHover] = useState(false);
	const model = props.model;
	console.log(model);
	let gltf = useLoader(GLTFLoader, getPath(model));
	const [gltfGeometry, setGltfGeometry] = useState();
	const [pos, setPos] = useState({ i: -100, j: -100 });
	if (!gltfGeometry) {
		const gltfScene = gltf.scene.clone(true);
		gltfScene.traverse(function (object) {
			if (object.isMesh) {
				object.material.color.set(
					props.side === 0 ? 0x000000 : 0xeeeeee
				);
				object.material.transparent = true;
				object.material.opacity = 1;
				object.material.metalness = 0.0;
				object.material.roughness = 0.8;
			}
		});
		setGltfGeometry(gltfScene);
	}
	if (pos.i < 0) {
		const newPos = { i: props.row, j: props.col };
		setPos(newPos);
	}
	const offset = getOffset(model);
	const gltfProps = {
		object: gltfGeometry,
		position: [-4.5 + offset.x + pos.i, -4.5 + offset.y + pos.j, 0.5],
		rotation: [-Math.PI, 0, 0],
		scale: getScale(model),
	};
	return (
		<primitive
			{...gltfProps}
			object={gltfGeometry}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		/>
	);
};
export default Piece;
