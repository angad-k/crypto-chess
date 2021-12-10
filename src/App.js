import React, { useEffect, useContext } from "react";
import getWeb3 from "./utils/getWeb3";
import Chess from "./build.eth/contracts/Chess.json";
import { Routes, Route } from "react-router-dom";
import Store from "./utils/Store";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";

const App = () => {
  const { setUser } = useContext(Store);

  const onMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Chess.networks[networkId];

      console.log(deployedNetwork?.address);

      const instance = new web3.eth.Contract(
        Chess.abi,
        deployedNetwork && deployedNetwork?.address
      );

      setUser({ web3, accounts: accounts[0], instance });
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
      <Route path="/" element={<Dashboard />} />
      <Route path="/practice" element={<Practice />} />
    </Routes>
  );
};

export default App;
