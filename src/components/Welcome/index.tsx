import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MINTER } from "@models/routes";

export default function Welcome() {
  // Router
  const router = useRouter();

  return (
    // Need to make buttons functional with marketplace
    <div className="container py-3">
      <div className="row">
        <div className="col py-4 d-flex align-items-center">
          <div>
            <h2 className="py-1">Welcome to our marketplace</h2>
            <p className="py-1">
              Discover endless unique digital collectibles of your favorite gamers, teams and games,
              made by incredible artists around the world.
            </p>
            <button className="btn btn-light rounded" onClick={() => router.push("/" + MINTER)}>
              <i className="bi bi-pencil mr-2"></i>
              Start Creating
            </button>
          </div>
        </div>
        <div className="col py-4">
          <Image alt="Cards" className="py-1" src="/images/Cards.png" width={467} height={300} />
        </div>
      </div>

      <div className="p-2 my-4 d-flex flex-row flex-wrap align-items-center">
        <div
          className="input-group border border-secondary rounded p-1"
          style={{ width: 50 + "%" }}
        >
          <div className="input-group-prepend border-0">
            <button type="button" className="btn bg-transparent" style={{ color: "#6c757d" }}>
              <i className="bi bi-search"></i>
            </button>
          </div>
          <input
            type="search"
            placeholder="Search for players, teams, and games"
            aria-describedby="button-addon4"
            className="form-control bg-transparent border-0"
          />
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-outline-secondary rounded">
            <i className="bi bi-filter mr-2"></i>
            Filter
          </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-outline-secondary rounded">
            Newest
            <i className="bi bi-chevron-down ml-2"></i>
          </button>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-outline-secondary rounded">
            <i className="bi bi-arrow-repeat mr-2"></i>
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
