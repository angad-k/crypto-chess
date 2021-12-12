import { useRef, useState } from "react";
import ActiveGames from "./ActiveGames";

const dummyData = {
  p1: "0x2698Dd3baabDFd0c7FaD64683b16fDA669639E2eF",
  p2: "0x129afbjkafsdgg3b1asdasd6fDA6696asda39E2eG",
  bidders: 213,
  highest_bid: 26,
  game_code: 1579,
};

const BettingPanel = () => {
  const [winnerColor, setWinnerColor] = useState("");
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(
      `Winner color chosen is ${winnerColor}, Winner amount is ${inputRef.current.value}`
    );
  };

  return (
    <div className="h-screen bg-dark">
      <div className="flex justify-center">
        <ActiveGames {...dummyData} />
        <input type="text" placeholder="Enter Bid amount" ref={inputRef} />
        <div className="flex">
          <div onClick={() => setWinnerColor("Black")}>Black</div>
          <div onClick={() => setWinnerColor("White")}>White</div>
        </div>
        <button onClick={handleSubmit}>Place Bid</button>
        <div className="w-20"></div>
      </div>
    </div>
  );
};

export default BettingPanel;
