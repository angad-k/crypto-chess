import { observer } from "mobx-react-lite";
import { useRef, useState, useContext } from "react";
import ActiveGames from "./ActiveGames";
import Store from "../utils/Store";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dummyData = {
  p1: "0x2698Dd3baabDFd0c7FaD64683b16fDA669639E2eF",
  p2: "0x129afbjkafsdgg3b1asdasd6fDA6696asda39E2eG",
  bidders: 213,
  highest_bid: 26,
  game_code: 1579,
};

const BettingPanel = observer((props) => {
  const inputRef = useRef();
  const [opened, setOpened] = useState(false);
  const { user } = useContext(Store);
  const notify = () =>
    toast("Bid Successfully Placed", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const handleBidWhite = async () => {
    console.log(props.whitePubkey, props.gameCode);
    var res = await user.signedContract.bet(
      props.whitePubkey,
      parseInt(props.gameCode),
      { value: ethers.utils.parseEther(inputRef.current.value) }
    );
    console.log(res);
    notify()
  };
  const handleBidBlack = async () => {
    console.log(props.blackPubkey, props.gameCode);
    var res = await user.signedContract.bet(
      props.blackPubkey,
      parseInt(props.gameCode),
      { value: ethers.utils.parseEther(inputRef.current.value) }
    );
    console.log(res);
    notify()
  };
  if (!opened) {
    return (
      <>
        <div
          onClick={() => {
            setOpened(true);
          }}
          className="bg-b2  p-3 w-400 text-white rounded-xl flex-row flex cursor-pointer justify-start"
        >
          <p className="text-base font-medium ml-3">Place Bid</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="rounded-xl border-2 p-2 border-white bg-dark">
          <div
            onClick={() => {
              setOpened(false);
            }}
            className=" bg-b2 w-400 p-3 text-white rounded-xl flex-row flex justify-between h-50 cursor-pointer content-center items-center"
          >
            <p className="text-base font-medium ml-3">Place Bid</p>
            <span className="text-lg font-medium font-bold text-primary mr-3">
              x
            </span>
          </div>
          <div className="bg-dark w-400 p-2 text-white flex-col flex gap-2"></div>
          <div className="flex flex-row content-center items-center justify-center gap-2 p-1">
            <input
              type="text"
              className="bg-b2 mt-0.5 appearance-none text-white rounded-xl py-2 px-4 opacity-80 leading-tight focus:outline-none w-400"
              placeholder="Enter Bid Amount"
              ref={inputRef}
            />
          </div>
          <div className="flex flex-row content-center items-center justify-center gap-5 p-1 mt-3 mb-2">
            <button
              className="bg-black text-white mt-0.5 font-medium appearance-none rounded-xl opacity-80 leading-tight focus:outline-none w-1/2 h-30"
              onClick={handleBidBlack}
            >
              Bid Black
            </button>
            <button
              className="bg-white mt-0.5 text-black font-medium appearance-none rounded-xl opacity-80 leading-tight focus:outline-none w-1/2 h-30"
              onClick={handleBidWhite}
            >
              Bid White
            </button>
          </div>
        </div>
      </>
    );
  }
});

export default BettingPanel;
