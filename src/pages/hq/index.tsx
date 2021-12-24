import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCardData, checkEntityCardExist } from "@services/contract";
import {
  MARKETPLACE,
  CONTROLCENTER,
  COMMUNICATIONS,
  CREATORLAB,
  CREATE_CARD,
} from "@models/routes";
import { LOGO_IMAGE } from "@styles/assets";
import { CSSTransition } from 'react-transition-group';
// import BgVideo from "@components/BgVideo";

const bg = "/video/Hq.mp4";

const HQPage: NextPage = () => {
  const router = useRouter();
  const [multiverseName, setMultiverseName] = useState("");
  const [multiverseTag, setMultiverseTag] = useState("");
  const [eSignature, setESignature] = useState("");
  // const [cardType, setCardType] = useState("");
  const [multiverseBirthday, setMultiverseBirthday] = useState('2021-12-11');
  const [eYear, setEYear] = useState(0);
  const [nftCount, setNFTCount] = useState(0);
  const [photoFile, setPhotoFile] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [backgroundSize, setBackgroundSize] = useState("background-contain");
  const videoRef = React.useRef();

  useEffect(() => {
    const onResize = () => {
      if (window.innerHeight / window.innerWidth > 0.5625) {
        if (videoRef.current) {
          videoRef.current.style.objectFit = "contain";
        }
        setBackgroundSize("background-contain");
      } else {
        if (videoRef.current) {
          videoRef.current.style.objectFit = "cover";

        }
        setBackgroundSize("background-cover");
      }
    };

    window.addEventListener('resize', onResize);
    const timer = setTimeout(() => {
      setIsLoaded(true);
      onResize();
    }, isMinted ? 10500 : 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    }
  }, []);

  // The border element for first and last step
  // const SecondBorder = () => {
  //   return (
  //     <>
  //       <div className="w-100 h-100 position-absolute border-line second-step z-back clip-content" />
  //       <div className="top-right-border triangle position-absolute" />
  //       <div className="bottom-left-border triangle position-absolute" />
  //     </>
  //   );
  // };

  // The card element
  const CardContent = () => {
    return (
      <div className="col-md-12 h-100">
        {/* <SecondBorder /> */}
        {/* <div className="border-content w-100 second-step position-absolute h-100 border-line z-back text-center" /> */}
        <div className="row mx-0 h-100 d-flex flex-column justify-content-evenly">
          <div className="col-md-12 p-0 position-relative d-flex justify-content-center">
            <div className="m-1 top-0 start-0 position-absolute">
              <Image src={LOGO_IMAGE} width={40} height={40} alt="responsive" loading="lazy" />
            </div>
            <div className="card-title fs-4 py-1">Entity</div>          
          </div>
          <div className="col-md-12 p-0">
            <div className="row m-0 h-100">
              <div className="col-md-6 pt-2 px-2">
                <div className="drop-card-content w-100 cursor-pointer position-relative">
                  {photoFile !== "" && (
                    <Image
                      src={photoFile}
                      className="card-photo"
                      layout="fill"
                      alt="responsive"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
              <div className="col-md-6 pt-2 px-2">
                <div className="w-100">
                  <div className="card-text fs-6">{multiverseName}</div>
                </div>
                <div className="w-100">
                  <div className="card-text fs-6">{multiverseTag}</div>
                </div>
                <div className="w-100">
                  <div className="card-text fs-6 overflow-hidden">{eSignature}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 p-0">
            <div className="row mx-1">
              <div className="col-md-3 px-0">
                <div className="w-100 text-center">
                  <div className="card-text fs-7">{eYear}</div>
                  <div className="card-label fs-7">Season</div>
                </div>
              </div>
              <div className="col-md-5 px-0">
                <div className="w-100 text-center">
                  <div className="card-text fs-7">{multiverseBirthday}</div>
                  <div className="card-label fs-7">Birthday</div>
                </div>
              </div>
              <div className="col-md-4 px-0">
                <div className="w-100 text-center">
                  <div className="card-text fs-7">{nftCount}</div>
                  <div className="card-label fs-7">Level</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const checkPermission = async () => {
    try {
      const isExist = await checkEntityCardExist();

      if (!isExist) {
        router.push("/" + CREATE_CARD);
      }
    } catch (err: any) {
      console.log("Check Entity Card exit: ", err);
      router.push("/");
    }
  };
  
  useEffect(() => {
    async function getUserdata() {
      const jsonData = await getCardData();
      const attributes = jsonData.attributes;
      setMultiverseName(attributes.multiverseName);
      setMultiverseTag(attributes.multiverseTag);
      setMultiverseBirthday(attributes.multiverseBirthday);
      setMultiverseTag(attributes.multiverseTag);
      setESignature(attributes.eSignature);
      setEYear(attributes.eYear);
      // setCardType(attributes.cardType);
      setNFTCount(attributes.nftCount);
      setPhotoFile(jsonData.image.replace("ipfs://", "https://dweb.link/ipfs/"));
    }
    setIsMinted(localStorage.getItem('mint-approved') === 'TRUE');
    checkPermission();
    getUserdata();
  }, []);

  return (
    <>
    {!isMinted &&
      <div className="full-content position-absolute d-flex justify-center">
        <div className={`hq-content w-available z-back ${backgroundSize}`}></div>
      </div>
    }
    {isMinted &&
      <video
        ref={videoRef}
        autoPlay
        loop={false}
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    }
      {/* <BgVideo videoSource={bg} loop={false} /> */}
      <CSSTransition in={isLoaded} unmountOnExit timeout={1000}>
        <div className="justify-center d-flex align-center border border-light rounded-3 text-light hq-exchange hq-card-fade">
          <div
            className="cursor-pointer w-100 h-100 d-flex justify-center align-center"
            onClick={() => router.push("/" + MARKETPLACE)}
          >
            Exchange
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isLoaded} unmountOnExit timeout={1000}>
        <div className="justify-center d-flex align-center border border-light rounded-3 text-light hq-control-center hq-card-fade">
          <div
            className="cursor-pointer w-100 h-100 d-flex justify-center align-center"
            onClick={() => router.push("/" + CONTROLCENTER)}
          >
            Control Center
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isLoaded} unmountOnExit timeout={1000}>
        <div className="justify-center d-flex align-center border border-light rounded-3 text-light hq-communications hq-card-fade">
          <div
            className="cursor-pointer w-100 h-100 d-flex justify-center align-center"
            onClick={() => router.push("/" + COMMUNICATIONS)}
          >
            Communications
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isLoaded} unmountOnExit timeout={1000}>
        <div className="justify-center d-flex align-center border border-light rounded-3 text-light hq-creator-lab hq-card-fade">
          <div
            className="cursor-pointer w-100 h-100 d-flex justify-center align-center"
            onClick={() => router.push("/" + CREATORLAB)}
          >
            Creator Lab
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isLoaded} unmountOnExit timeout={1000}>
        <div className={`hq-card-container hq-card-fade ${!isMinted && 'hq-card-bg'}`}>
          <CardContent />
        </div>
      </CSSTransition>
    </>
  );
};

export default HQPage;
