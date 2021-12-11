import {
  modalStyles,
  modalHeaderStyles,
  modalInputStyles,
  modalPrimaryCtaStyles,
  modalSecCtaStyles,
} from "../utils/theme";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Store from "../utils/Store";
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";

const Modal1v1 = observer(({ type, closeModal }) => {
  const {user} = useContext(Store);
  const navigate = useNavigate()
  // const {user} = useContext(Store);
  // console.log(user);
  const handleJoin = async() => {
    var gameID=document.getElementById("input-field").value;
    var stake = await user.signedContract.getStake(parseInt(gameID))
    var res=await user.signedContract.joinGame(gameID,{value:stake})
    console.log(res)
    navigate("../joinGame/"+gameID)
  };
  const handleCancel = () => closeModal();
  const handleStart = async() => {
    var stakedCoins=document.getElementById("input-field").value;
    var transaction = await user.signedContract.newGame({
      value: ethers.utils.parseEther(stakedCoins)
    })
    var transactionRec = await user.provider.waitForTransaction(transaction.hash,1)
    console.log(transactionRec)
    var result= await user.signedContract.getGameID(user.accounts)
    navigate("../createGame/"+result)
  };

  return (
    <div className="bg-opacity-30 bg-black fixed top-0 h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div className={modalStyles}>
        <p className={modalHeaderStyles}>{type} Game</p>
        <input
          type="text"
          placeholder={
            type === "Join" ? "Enter Game Code" : "Enter Coins to Stake"
          }
          className={modalInputStyles}
          id="input-field"
        />
        <button
          className={modalPrimaryCtaStyles}
          onClick={type === "Join" ? handleJoin : handleStart}
        >
          {type === "Join" ? "Join" : "Create"}
        </button>
        <button onClick={handleCancel} className={`${modalSecCtaStyles} ml-2`}>
          Cancel
        </button>
      </div>
    </div>
  );
});

export default Modal1v1;
