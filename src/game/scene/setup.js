import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Piece, { Models } from "./piece";
import positions from "./positions";

const Setup = () => {
	return positions.map((position, i) => {
		return (
			<Piece
				row={position.i}
				col={position.j}
				coord={position.coord}
				side={position.coord}
				model={position.model}
			/>
		);
	});
};

export default Setup;
