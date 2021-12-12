import TopNav from "../components/TopNav";
import ActiveGames from "./ActiveGames";
import { useEffect } from "react";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Store from "../utils/Store";
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
  const {user} = useContext(Store);
  
  var games = [];

  if(user.signedContract){
    var allgames=user.signedContract.getGames() //<=await yahan 
    (allgames || []).forEach(gameID => {
      let game=user.signedContract.getGame(parseInt(gameID)); //<=await yahan 
      games.push(game)
    });
    console.log(games)
  }

  useEffect(()=>{
    
  },[])

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

export default observer(BettingLobby);
