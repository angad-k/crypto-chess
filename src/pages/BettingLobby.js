import { useContext, useEffect } from "react";
import TopNav from "../components/TopNav";
import Store from "../utils/Store";
import ActiveGames from "./ActiveGames";
import { toJS } from "mobx";

const dummyData = [
  {
    p1: "0x2698Dd3baabDFd0c7FaD64683b16fDA669639E2eF",
    p2: "0x129afbjkafsdgg3b1asdasd6fDA6696asda39E2eG",
    bidders: 213,
    highest_bid: 26,
    game_code: 1579,
  },
  {
    p1: "0x2698Dd3bahwogpishgoshdgh6fDA669639E2eF",
    p2: "0x129afbj[owekgpojsdpbjposb]a39E2eG",
    bidders: 233,
    highest_bid: 12,
    game_code: 1876,
  },
];

const BettingLobby = () => {
  const { user } = useContext(Store);
  console.log(toJS(user));

  const fetchActiveGames = async () => {
    if (!user.signedContract) return null;
    let activeGames = [];

    const latestGameId = await user.signedContract.getLatestGameId();
    for (let i = 0; i < latestGameId; i++) {
      const game = await user.signedContract.getGame(i);
      if (!game.finished) activeGames.push(game);
    }
    console.log(activeGames);
    return activeGames;
  };

  useEffect(() => {
    fetchActiveGames().then((games) => console.log(games));
  });

  return (
    <div className="bg-dark h-screen overflow-y-auto">
      <TopNav />
      <div>
        {dummyData.map((game) => (
          <ActiveGames key={game.game_code} {...game} />
        ))}
      </div>
    </div>
  );
};

export default BettingLobby;
