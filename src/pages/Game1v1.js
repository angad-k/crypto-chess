import TopNav from "../components/TopNav";
import Chess from "../game/scene/main_scene";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Store from "../utils/Store";

const Game1v1 = (props) => {
	const params = useParams();
	const { user } = useContext(Store);
	return (
		<div className="bg-dark h-screen overflow-auto">
			<div className="h-screen">
				{props.type === "Create" ? (
					<Chess
						pubKey={user.accounts}
						gameCode={params.gameCode}
						isHost
					/>
				) : (
					<Chess pubKey={user.accounts} gameCode={params.gameCode} />
				)}
			</div>
		</div>
	);
};

export default Game1v1;
