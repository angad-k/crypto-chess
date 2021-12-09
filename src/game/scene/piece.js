import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera, MeshLambertMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getNotationFromCoords } from "./coordutils";
import { Colors } from "./utils";

export const Models = {
	PAWN: 0,
	QUEEN: 1,
	ROOK: 2,
	BISHOP: 3,
	KNIGHT: 4,
	KING: 5,
};

const getPath = (model, side) => {
	if (side == Colors.WHITE) {
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
	} else {
		switch (model) {
			case Models.PAWN:
				return "/assets/models/PawnX.glb";
			case Models.QUEEN:
				return "/assets/models/QueenX.glb";
			case Models.ROOK:
				return "/assets/models/RookX.glb";
			case Models.BISHOP:
				return "/assets/models/BishopX.glb";
			case Models.KING:
				return "/assets/models/KingX.glb";
			case Models.KNIGHT:
				return "/assets/models/KnightX.glb";
		}
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
				y: 0.45,
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
	const model = props.model;
	let gltf = useLoader(GLTFLoader, getPath(model, props.side));
	const [gltfGeometry, setGltfGeometry] = useState();
	if (!gltfGeometry) {
		const gltfScene = gltf.scene.clone(true);
		gltfScene.traverse(function (object) {
			if (object.isMesh) {
				object.material.color.set(
					props.side == Colors.WHITE ? 0x555555 : 0x000000
				);
				object.material.transparent = true;
				object.material.opacity = 1;
				object.material.metalness = 0.0;
				object.material.roughness = 0.8;
				if (props.side === Colors.BLACK) {
					object.rotateY(Math.PI);
				}
			}
		});
		setGltfGeometry(gltfScene);
	}
	const offset = getOffset(model);
	let gltfProps;
	if (props.side === Colors.WHITE) {
		gltfProps = {
			object: gltfGeometry,
			position: [
				-3.5 + offset.x + props.row,
				-3.5 + offset.y + props.col,
				0.5,
			],
			rotation: [-Math.PI, 0, 0],
			scale: getScale(model),
		};
	} else {
		gltfProps = {
			object: gltfGeometry,
			position: [
				-3.5 - offset.x + props.row,
				-3.5 - offset.y + props.col,
				0.5,
			],
			rotation: [-Math.PI, 0, 0],
			scale: getScale(model),
		};
	}
	const handleClick = () => {
		if (props.clickable) {
			props.handleClick(getNotationFromCoords(props.row, props.col));
		}
	};
	return (
		<group dispose={undefined}>
			<primitive
				{...gltfProps}
				dispose={undefined}
				object={gltfGeometry}
				onClick={handleClick}
			/>
		</group>
	);
};
export default Piece;
