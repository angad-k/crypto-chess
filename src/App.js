import "./App.css";
import React, { useRef, useState } from "react";
import Chess from "./game/scene/main_scene";

function App() {
	return (
		<div style={{ position: "relative"}}>
			<Chess></Chess>
		</div>
	);
}

export default App;
