import React, { useState } from "react";
import { ethers, Contract } from "ethers";
import Terran721 from "artifacts/Terran721.json";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { VideoCardProps } from "@models/videoCard";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

const VideoCard = (props: VideoCardProps) => {
  // The state management
  const [isLoading, setLoading] = useState(false);

  // Smart Contract Deploy Address
  const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS || "";

  // The function to get contract
  const requestContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new Contract(CONTRACT_ADDRESS, Terran721.abi, signer);

    return contract;
  };

  // The function to get user's Metamask wallet address
  const requestAccount = async () => {
    if (window.ethereum?.request) return window.ethereum.request({ method: "eth_requestAccounts" });

    throw new Error(
      "Missing install Metamask. Please access https://metamask.io/ to install extension on your browser"
    );
  };

  // Then function to create marketplace asset
  const createAsset = async (tokenURI: any) => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.createAsset(tokenURI));
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // Then function to get the number of assets
  const getNumberOfAssets = async () => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.getNumberOfAssets());
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // Then function to mint nft
  const mint = async (tokenURI: any) => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.mint(tokenURI));
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // Then function to pause marketplace
  const pause = async () => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.pause());
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // Then function to unpause marketplace
  const unpause = async () => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.unpause());
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  // Then function to buy with token
  const buyWithToken = async () => {
    setLoading(true);
    const contract = requestContract();
    try {
      console.log(await contract.buyWithToken());
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="col-sx-12 col-sm-6 col-lg-4 p-2">
      <Card className="card bg-dark border-white text-white card-border-30">
        <Card.Header className="text-center">
          <Row className="m-2">
            <Col>
              <Card.Img
                variant="top"
                id="ProfPic"
                className="border-white card-border-30"
                src={props.url}
              />
            </Col>
            <Col>
              <Card.Img
                variant="top"
                id="ProfPic"
                className="border-white card-border-30"
                src={props.url}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="bg-secondary border-white card-border-30">
          <Row>
            <Col className="text-center">
              <h5>Strengths</h5>
              <ul>
                <li>Blockchain</li>
                <li>Leadership</li>
                <li>Dad Jokes</li>
              </ul>
            </Col>
            <Col className="text-center">
              <h5>Weaknesses</h5>
              <ul>
                <li>Good Wine</li>
                <li>5AM Calls</li>
                <li>Mondays</li>
              </ul>
            </Col>
          </Row>
          <Row>
            {props.editable ? (
              <Col className="text-center">
                <Button variant="primary">Edit</Button>
              </Col>
            ) : isLoading ? (
              <Row className="justify-center">
                <Spinner animation="border" variant="primary" />
              </Row>
            ) : (
              <Col className="text-center">
                <Button className="m-1" variant="primary" onClick={getNumberOfAssets}>
                  Get Number of Assets
                </Button>
                <Button className="m-1" variant="primary" onClick={() => createAsset(props.url)}>
                  Create Assets
                </Button>
                <Button className="m-1" variant="primary" onClick={() => mint(props.url)}>
                  Mint
                </Button>
                <Button className="m-1" variant="primary" onClick={pause}>
                  Pause
                </Button>
                <Button className="m-1" variant="primary" onClick={unpause}>
                  Unpause
                </Button>
                <Button className="m-1" variant="primary" onClick={buyWithToken}>
                  Buy with Token
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VideoCard;
