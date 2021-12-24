import React from "react";
import { NextPage } from "next";
import Nav from "@components/Nav";
import Welcome from "@components/Welcome";
import MarketplaceAssets from "@components/MarketplaceAssets";

const MarketplacePage: NextPage = () => {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <Welcome />
        <MarketplaceAssets />
      </div>
    </div>
  );
};

export default MarketplacePage;
