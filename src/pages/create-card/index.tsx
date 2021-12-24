import React, { useState, useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { ethers, Contract } from "ethers";
import Terran721 from "artifacts/Terran721.json";
import { LOGO_IMAGE } from "@styles/assets";
import { Spinner } from "react-bootstrap";
import { HQ } from "@models/routes";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

// Smart Contract Deploy Address
const CONTRACT_ADDRESS: string = process.env.CONTRACT_ADDRESS || "";

const CreateCardPage: NextPage = () => {
  // Router
  const router = useRouter();

  // The state management
  const [isLoadng, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mintStep, setMintStep] = useState(0);
  const [multiverseName, setMultiverseName] = useState("");
  const [multiverseTag, setMultiverseTag] = useState("");
  const [eSignature, setESignature] = useState("");
  const [cardType, setCardType] = useState("Entity");

  // The function to get current date
  const getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let birthday: string = mm + "-" + dd + ", " + yyyy;

    return birthday;
  };

  // function for get error message from metamask
  function showErrorMessage(message: string, err: any) {
    let error_status = JSON.parse(JSON.stringify(err));
    let error_message = "";
    if (error_status.message) {
      error_message = error_status.message;
    } else {
      error_message = error_status.error.message;
    }

    error_message = error_message.replace("execution reverted: ", "");
    setErrorMessage(message + error_message);
  }

  const [multiverseBirthday, setMultiverseBirthday] = useState(getCurrentDate());
  const [eYear, setEYear] = useState(0);
  const [nftCount, setNFTCount] = useState(0);

  const photoFileRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoFileURL, setPhotoFileURL] = useState("");

  // The function to upload Photo
  const uploadPhotoFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setPhotoFile(img);
      setPhotoFileURL(URL.createObjectURL(img));
    }
  };

  // The function to handle of upload Photo
  const handleUploadPhotoFile = () => {
    photoFileRef?.current?.click();
  };

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

  const [ipfsHash, setIpfsHash] = useState("");

  // The function to upload to IPFS
  const handleUpload = async () => {
    if (multiverseName !== "" && multiverseTag !== "" && eSignature !== "" && cardType !== "") {
      setLoading(true);
      const cardInfo = {
        multiverseName,
        multiverseTag,
        eSignature,
        cardType,
        multiverseBirthday: getCurrentDate(),
        eYear: 0,
        nftCount,
      };

      const data: any = new FormData();
      data.append("cardInfo", JSON.stringify(cardInfo));
      data.append("photoFile", photoFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const jsonResponse = await response.json();
      setIpfsHash(jsonResponse.ipfsHash);
      setLoading(false);
      setMintStep(2);
    }
  };

  // The function to mint of Entity
  const handleMint = async () => {
    const [address] = await requestAccount();
    console.log(address);
    const contract = requestContract();
    try {
      setLoading(true);
      await contract.mint();
      setLoading(false);
      router.push("/" + HQ);
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      showErrorMessage("Could not mint this NFT. ", err);
    }
  };

  // The function for reset
  const reset = () => {
    setErrorMessage("");
    router.push("/");
  };

  // The border element for first and last step
  const FirstBorder = () => {
    return (
      <>
        <div className="w-100 h-100 position-absolute border-line first-step z-back clip-content" />
        <div className="top-left-border triangle position-absolute" />
        <div className="bottom-right-border triangle position-absolute" />
      </>
    );
  };

  // The border element for first and last step
  const SecondBorder = () => {
    return (
      <>
        <div className="w-100 h-100 position-absolute border-line second-step z-back clip-content" />
        <div className="top-right-border triangle position-absolute" />
        <div className="bottom-left-border triangle position-absolute" />
      </>
    );
  };

  // The Error content element
  const ErrorContent = () => {
    return (
      <div className="position-relative">
        <FirstBorder />
        <div className="border-content w-100 first-step position-absolute h-100 border-line z-back text-center" />
        <div className="text-center pt-4 px-5">
          <div className="card-text">{errorMessage}</div>
          <button className="card-button cursor-pointer" onClick={reset}>
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="he-100 d-flex justify-center align-center full-content">
      <div className="full-content position-absolute d-flex justify-center">
        <div className="create-card-content w-available z-back"></div>
      </div>

      {isLoadng ? (
        <Spinner animation="border" variant="info" />
      ) : errorMessage === "" ? (
        <div className="position-relative">
          {mintStep === 0 && (
            <>
              <FirstBorder />
              <div className="border-content w-100 first-step position-absolute h-100 border-line z-back text-center" />
              <div className="text-center pt-4 px-5">
                <div className="card-text">
                  Before you continue, create
                  <br /> your unique Entity to
                  <br /> represent you in the multiverse.
                </div>
                <button className="card-button cursor-pointer" onClick={() => setMintStep(1)}>
                  Continue
                </button>
              </div>
            </>
          )}
          {mintStep === 1 && (
            <>
              <SecondBorder />
              <div className="border-content w-100 second-step position-absolute h-100 border-line z-back text-center" />
              <div className="d-flex">
                <div className="text-center col-md-4 pt-4 px-4">
                  <div
                    className="drop-content w-100 h-100 position-relative cursor-pointer"
                    onClick={handleUploadPhotoFile}
                  >
                    {photoFileURL !== "" && (
                      <Image
                        src={photoFileURL}
                        className="card-photo"
                        layout="fill"
                        alt="responsive"
                        loading="lazy"
                      />
                    )}
                    <input
                      type="file"
                      className="d-none"
                      name="myImage"
                      onChange={uploadPhotoFile}
                      ref={photoFileRef}
                    />
                    <div className="position-absolute m-1 top-0">
                      <Image
                        src={LOGO_IMAGE}
                        width={40}
                        height={40}
                        alt="responsive"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center col-md-8 pt-4 px-4">
                  <div className="col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="w-100">
                          <div className="card-text py-1">Multiverse Name</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={multiverseName}
                            onChange={(e) => setMultiverseName(e.target.value)}
                            autoFocus={true}
                          />
                        </div>
                        <div className="w-100">
                          <div className="card-text py-1">Tacvue Tag</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={multiverseTag}
                            onChange={(e) => setMultiverseTag(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="w-100">
                          <div className="card-text py-1">E-Signature</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={eSignature}
                            onChange={(e) => setESignature(e.target.value)}
                          />
                        </div>
                        <div className="w-100">
                          <div className="card-text py-1">Card Type</div>
                          <select
                            className="card-input w-available px-2"
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                          >
                            <option value="Entity" className="card-input w-available px-2">
                              Entity
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="w-100">
                          <div className="card-text py-1">Multiverse birthday</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={multiverseBirthday}
                            onChange={(e) => setMultiverseBirthday(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="w-100">
                          <div className="card-text py-1">Multiverse EYear</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={eYear}
                            onChange={(e) => setEYear(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="w-100">
                          <div className="card-text py-1">NFT Count</div>
                          <input
                            className="card-input w-available px-2"
                            type="text"
                            value={nftCount}
                            onChange={(e) => setNFTCount(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 text-center">
                <button className="card-button cursor-pointer" onClick={handleUpload}>
                  Continue
                </button>
              </div>
            </>
          )}
          {mintStep === 2 && (
            <>
              <FirstBorder />
              <div className="border-content first-step w-100 position-absolute h-100 border-line z-back text-center" />
              <div className="w-100 text-center">
                <div className="text-center pt-4 px-5">
                  <div className="card-text">
                    Once you mint your Entity
                    <br /> you cannot change it.
                    <br />
                    <br /> Do you want it proceed.?
                  </div>
                  <button className="card-button cursor-pointer" onClick={handleMint}>
                    Mint Entity
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <ErrorContent />
      )}
    </div>
  );
};

export default CreateCardPage;
