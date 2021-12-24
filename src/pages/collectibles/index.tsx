import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import Nav from "@components/Nav";

const CollectiblesInfoPage: NextPage = () => {
  return (
    <div>
      <Nav />
      <div className="container py-3">
        <div className="row my-5">
          <div className="col py-4 d-flex align-items-center text-center">
            <div>
              <h2 className="py-1">Our collectibles</h2>
              <p className="py-1">
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.&quot;
              </p>
              <button className="btn btn-light rounded">
                <i className="bi bi-pencil mr-2"></i>
                Start Creating
              </button>
            </div>
          </div>
          <div className="col py-4">
            <Image
              alt="Cards"
              className="py-1"
              src="/images/Collectibles.png"
              width={307}
              height={300}
            />
          </div>
        </div>

        <div className="row my-5 text-center">
          <div className="col py-4">
            <h2 className="py-1">Slots</h2>
            <p className="py-1">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.&quot;
            </p>
          </div>
        </div>

        <div className="row my-5">
          <div className="col py-4 text-right">
            <h3 className="py-1 mb-2 pr-5">Static Slots</h3>
            <Image
              alt="StaticSlots"
              className="py-1 my-3"
              src="/images/StaticSlots.png"
              width={308}
              height={170}
            />
            <p className="py-1 mt-2 pr-5">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;
            </p>
          </div>
          <div className="col py-4 text-left">
            <h3 className="py-1 mb-2 pl-5">Dynamic Slots</h3>
            <Image
              alt="StaticSlots"
              className="py-1 my-3"
              src="/images/DynamicSlots.png"
              width={302}
              height={170}
            />
            <p className="py-1 mt-2 pl-5">
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesInfoPage;
