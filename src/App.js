import "./App.css";
import React, { useRef, useState, Suspense  } from "react";
import Chess from "./game/scene/main_scene";

function App() {
	return (
		<div style={{height :'100vh', width : "100%"}}>
			<Suspense fallback={<></>}>
			<Chess></Chess>
			</Suspense>
		</div>
	);
}

export default App;
