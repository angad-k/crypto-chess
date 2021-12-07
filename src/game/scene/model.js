import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
export const Model = ({ url }) => {
	const geom = useLoader(STLLoader, url);

	const ref = useRef();

	return (
		<>
			<mesh ref={ref}>
				<primitive object={geom} attach="geometry" />
				<meshStandardMaterial color={"orange"} />
			</mesh>
		</>
	);
};
