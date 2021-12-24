import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { GoogleLogin } from "react-google-login";
import { Button } from "react-bootstrap";
import { MARKETPLACE, CREATE_CARD } from "@models/routes";
import { MultiverseContent } from "@styles/index";

const GOOGLE_CLIENT_ID: string =
  typeof process.env.GOOGLE_CLIENT_ID === "undefined" ? "" : process.env.GOOGLE_CLIENT_ID;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const HomePage: NextPage = () => {
  // Router
  const router = useRouter();

  // State managements
  const [walletAddress, setWalletAddress] = useState<any>(null); // user's Metamask wallet address
  const [isCardExist, setCardExist] = useState(false);

  // The function to get user's Metamask wallet address
  const requestAccount = async () => {
    if (window.ethereum?.request) {
      return window.ethereum.request({ method: "eth_requestAccounts" });
    }

    throw new Error(
      "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
    );
  };

  // The function to check if card exists
  const checkCardExist = (address: string) => {
    return false;
  };

  // The function to load data from blockchain network
  const loadBlockchainData = async () => {
    const [address] = await requestAccount();
    localStorage.setItem("wallet-address", address);
    setWalletAddress(address);
    const checkCard = checkCardExist(address);
    setCardExist(checkCard);
    if (checkCard) {
      router.push("/" + MARKETPLACE);
    }
  };

  // The function to Google sign
  const getGoogleData = (res: any) => {
    localStorage.setItem("google", JSON.stringify(res));
    router.push("/" + CREATE_CARD);
  };

  // The function to get connect content
  const ConnectWalletContent = () => {
    if (walletAddress === null) {
      return <Button onClick={loadBlockchainData}>Connect Wallet</Button>;
    } else return <></>;
  };

  // The function to get create card content
  const CreateCardContent = () => {
    if (walletAddress !== null && !isCardExist) {
      return (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={getGoogleData}
          onFailure={getGoogleData}
          icon={false}
          render={(renderProps) => <Button onClick={renderProps.onClick}>Create Card</Button>}
        />
      );
    } else return <></>;
  };

  useEffect(() => {
    setWalletAddress(localStorage.getItem("wallet-address"));
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center text-center fullvHeight">
      <div>
        <MultiverseContent>
          <h1> Enter the MultiVerse Portal </h1>
        </MultiverseContent>

        <ConnectWalletContent />
        <CreateCardContent />
      </div>
    </div>
  );
};

export default HomePage;
