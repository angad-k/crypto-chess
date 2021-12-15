import { get_avatar_url, truncatePubKey } from "../utils/utils";

const PlayerLeft = (props) => {
	return (
		<div className="flex flex-row bg-b2 w-250 items-center gap-1 rounded-md justify-center h-75 absolute left-0 top-20 ml-6">
			<div className="flex gap-1 items-center">
				<div className="p-2 rounded-full bg-dark">
					<img
						className="h-8"
						alt="avatar"
						src={get_avatar_url(props.pubKey)}
					/>
				</div>
				<p className="text-white font-medium opacity-75 text-sm bg-b1 rounded-full py-1 px-2">
					{truncatePubKey(props.pubKey)}
				</p>
			</div>
			<div className="bg-white rounded-lg h-30 w-30 border-2 border-yellow-500 ml-6"></div>
		</div>
	);
};

export default PlayerLeft;
