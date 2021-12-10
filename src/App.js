import React, { Suspense } from "react";
import Chess from "./game/scene/main_scene";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Suspense fallback={<></>}>
        <Chess gameCode="abc" pubKey="xyz" isHost="true"></Chess>
      </Suspense>
    </div>
  );
}

export default App;
