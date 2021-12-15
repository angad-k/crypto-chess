import { get_avatar_url, truncatePubKey } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const ActiveGames = ({ p1, p2, bidOnp1, bidOnp2, game_code }) => {
	const p1Avatar = get_avatar_url(p1);
	const p2Avatar = get_avatar_url(p2);

	const navigate = useNavigate();
	const redirect = () => {
		window.location.replace(`/stream/${game_code}`);
	};

	return (
		<div
			className="w-2/5	mx-auto my-8 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl"
			onClick={redirect}
		>
			<div className="flex justify-between items-center px-6 py-3 bg-b1">
				<div className="flex items-center gap-x-4">
					<div className="p-2 rounded-full bg-white bg-opacity-10 w-max">
						<img src={p1Avatar} alt="p1" className="h-12" />
					</div>
					<p className="">{truncatePubKey(p1)}</p>
				</div>
				<p className="opacity-80 text-lg font-medium">VS</p>
				<div className="flex items-center gap-x-4">
					<p>{truncatePubKey(p2)}</p>
					<div className="p-2 rounded-full bg-white bg-opacity-10 w-max">
						<img src={p2Avatar} alt="p2" className="h-12" />
					</div>
				</div>
			</div>
			<div className="flex justify-between px-6 py-3 bg-b2">
				<p className="text-sm text-white">
					<span className="text-2xl ml-2">{bidOnp1}</span>
				</p>
				<p className="text-sm">
					<span className="text-2xl ml-2">{bidOnp2}</span>
				</p>
			</div>
		</div>
	);
};

export default ActiveGames;
