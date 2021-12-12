import React, { useEffect, useContext } from "react";
import getWeb3 from "./utils/getWeb3";
import * as ChessContract from "./build.eth/contracts/Chess.json";
import { Routes, Route } from "react-router-dom";
import Store from "./utils/Store";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Game1v1 from "./pages/Game1v1";
import { ethers } from "ethers";
import BettingLobby from "./pages/BettingLobby";
import Stream from "./pages/Stream";
import BettingPanel from "./pages/BettingPanel";


const App = () => {
  const { setUser } = useContext(Store);

  const onMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ChessContract.networks[networkId];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(deployedNetwork.address);
      const signer = provider.getSigner(accounts[0]);
      const signedContract = new ethers.Contract(
        deployedNetwork.address,
        ChessContract.abi,
        signer
      );
      setUser({
        web3: web3,
        accounts: accounts[0],
        signedContract: signedContract,
        provider: provider,
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <Routes>
      <Route path="/createGame/:gameCode" element={<Game1v1 type="Create" />} />
      <Route path="/joinGame/:gameCode" element={<Game1v1 type="Join" />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/bet-lobby" element={<BettingLobby />} />
      <Route path="/stream/:gameCode" element={<Stream />} />
      <Route path="/test" element={<BettingPanel />} />
    </Routes>
  );
};

export default App;
