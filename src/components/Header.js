import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Logo from "./Logo";

const connectWallet = async () => {
  const provider = await detectEthereumProvider({
    mustBeMetaMask: true,
  });

  if (provider) {
    try {
      provider.on("chainChanged", () => {
        window.location.reload();
      });
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      if (chainId === "0x13881") {
        console.log("Already connected");
      }
      await provider.request({ method: "eth_requestAccounts" });
      provider.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.");
        }
      });
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13881",
            chainName: "Polygon Testnet Mumbai",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      });
      let currentAccount = null;
      function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== currentAccount) {
          currentAccount = accounts[0];
          console.log(currentAccount);
        }
      }
      provider
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });
      provider.on("accountsChanged", handleAccountsChanged);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error("Please install MetaMask");
  }
};

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["white", "white", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return <div onClick={toggle}>{isOpen ? <CloseIcon /> : <MenuIcon />}</div>;
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <a href={to}>
      <p {...rest}>{children}</p>
    </a>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <div style={{ flexBasis: "100%", display: isOpen ? "block" : "none" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MenuItem to="/signup" isLast>
          <button onClick={connectWallet()}>Connect</button>
        </MenuItem>
      </div>
    </div>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default NavBar;