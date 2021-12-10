import React, { useEffect, useState } from "react";
import getWeb3 from "./utils/getWeb3";
import Chess from "./build.eth/contracts/Chess.json";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./pages/AllRoutes";

const App = () => {
  const [Web3, setWeb3] = useState(null);
  const [Accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  const onMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Chess.networks[networkId];
      console.log(deployedNetwork.address);
      const instance = new web3.eth.Contract(
        Chess.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
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
    <Router>
      <AllRoutes />
    </Router>
  );
};

export default App;
