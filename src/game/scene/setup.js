import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Piece, { Models } from "./piece";

const Setup = (props) => {
	//onsole.log(initialPositions.length);
	console.log(props.positions);
	return props.positions.map((position, i) => {
		return (
			<Piece
				row={position.i}
				col={position.j}
				side={position.side}
				model={position.model}
				handleClick={props.handlePieceClick}
				clickable={position.side == props.playerColor}
			/>
		);
	});
};

export default Setup;
