import { getRandomChessImagePath } from "../utils/utils";
import Loader from "react-loader-spinner";
import TopNav from "../components/TopNav";
import Chat from "../components/Chat";

const WaitingPage = () => (
	<div
		className="h-screen bg-dark bg-center bg-cover bg-no-repeat bg-blend-multiply"
		style={{ backgroundImage: getRandomChessImagePath() }}
	>
		<TopNav />
		<div className="w-1/2 mx-auto  transform translate-y-56 flex justify-center items-center flex-col">
			<Loader type="Puff" color="#00BFFF" height={25} width={25} />
			<p className="mt-5">Waiting for other players to join</p>
		</div>
	</div>
);

export default WaitingPage;
