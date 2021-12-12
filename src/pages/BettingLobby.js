import { useContext, useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import Store from "../utils/Store";
import ActiveGames from "./ActiveGames";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import Loader from "react-loader-spinner";

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

const BettingLobby = () => {
  const { user } = useContext(Store);
  const [activeGames, setActiveGames] = useState([]);

  console.log(toJS(user));

  const fetchActiveGames = async () => {
    if (!user.signedContract) return null;
    let activeGames = [];

    let latestGameId = await user.signedContract.getLatestGameId();
    latestGameId = parseInt(latestGameId._hex, 16);

    for (let i = 1568; i < latestGameId; i++) {
      const game = await user.signedContract.getGame(i);
      if (!game.finished) {
        var gg = {
          p1: game.player1,
          p2: game.player1,
          bidOnp1: 2 + Math.floor(Math.random() * 50),
          bidOnp2: 2 + Math.floor(Math.random() * 50),
          game_code: i,
        };
        activeGames.push(gg);
      }
    }
    setActiveGames(activeGames);
    return activeGames;
  };

  useEffect(() => {
    fetchActiveGames();
  }, [user.signedContract]);

  console.log(activeGames);

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
            <Loader type="Puff" color="#00BFFF" height={25} width={25} />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(BettingLobby);
