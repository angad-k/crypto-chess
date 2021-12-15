import { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Store from "../utils/Store";
import ActiveGames from "./ActiveGames";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import Loader from "react-loader-spinner";
import { webSocketURL } from "../utils/const";
import { splitMessage } from "../utils/utils";

const dummyData = [
	{
		p1: "0x2698Dd3baabDFd0c7FaD64683b16fDA669639E2eF",
		p2: "0x129afbjkafsdgg3b1asdasd6fDA6696asda39E2eG",
		bidOnp1: 213,
		bidOnp2: 26,
		game_code: 1579,
	},
	{
		p1: "0x2698Dd3bahwogpishgoshdgh6fDA669639E2eF",
		p2: "0x129afbj[owekgpojsdpbjposb]a39E2eG",
		bidOnp1: 233,
		bidOnp2: 12,
		game_code: 1876,
	},
];
let onopenCalled = true;
const BettingLobby = () => {
	const { user } = useContext(Store);
	const { bettingLobby, setBettingLobby, resetBettingLobby } =
		useContext(Store);
	const { activeGames } = bettingLobby;
	const [socketMade, setSocketMade] = useState(false);
	const fetchActiveGames = () => {
		const s = new WebSocket(webSocketURL);
		onopenCalled = false;
		s.onopen = () => {
			if (!onopenCalled) {
				s.send(`get_active_games`);
			}
			onopenCalled = true;
		};
		s.onmessage = (event) => {
			let msg = event.data;
			let [cmd, arg] = splitMessage(msg);
			console.log(msg);
			switch (cmd) {
				case "active":
					let [gameCode, more] = splitMessage(arg);
					let [player1pubKey, player2pubKey] = splitMessage(more);
					let newEntry = {
						p1: player1pubKey,
						p2: player2pubKey,
						game_code: gameCode,
					};
					activeGames.push(newEntry);
					console.log(activeGames);
					setBettingLobby({
						activeGames: activeGames,
					});
					break;
				default: {
					//do nothing
				}
			}
		};
		setSocketMade(true);
	};
	console.log(activeGames);
	if (!socketMade) {
		fetchActiveGames();
	}

	return (
		<div className="bg-dark h-screen overflow-y-auto">
			<TopNav />
			<div>
				{activeGames.length > 0 ? (
					activeGames.map((game) => (
						<ActiveGames key={game.game_code} {...game} />
					))
				) : (
					<div className="w-max mx-auto pt-10">
						<Loader
							type="Puff"
							color="#00BFFF"
							height={25}
							width={25}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default observer(BettingLobby);
