import { observer } from "mobx-react-lite";
import { useRef, useState,useContext } from "react";
import ActiveGames from "./ActiveGames";
import Store from "../utils/Store";
import { ethers } from "ethers";
const dummyData = {
  p1: "0x2698Dd3baabDFd0c7FaD64683b16fDA669639E2eF",
  p2: "0x129afbjkafsdgg3b1asdasd6fDA6696asda39E2eG",
  bidders: 213,
  highest_bid: 26,
  game_code: 1579,
};

const BettingPanel = observer((props) => {
  const inputRef = useRef();
  const {user} = useContext(Store);
  const handleBidWhite = async() => {
    var res=await user.signedContract.bet(props.whitePubkey,props.gameCode,{value:ethers.utils.parseEther(inputRef.current.value)})
    console.log(res)
  };
  const handleBidBlack = async() => {
    var res=await user.signedContract.bet(props.blackPubkey,props.gameCode,{value:ethers.utils.parseEther(inputRef.current.value)})
    console.log(res)
  };

  return (
    <div className="h-screen bg-dark">
      <div className="flex justify-center">
        <input type="text" placeholder="Enter Bid amount" ref={inputRef} />
        <button onClick={handleBidBlack}>Bid Black</button>
        <button onClick={handleBidWhite}>Bid White</button>
        <div className="w-20"></div>
      </div>
    </div>
  );
});

export default BettingPanel;
