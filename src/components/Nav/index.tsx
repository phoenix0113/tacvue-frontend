import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { COLLECTIBLES, MARKETPLACE } from "@models/routes";

export default function Nav() {
  // Router
  const router = useRouter();

  return (
    <nav className="navbar navbar-custom">
      <div className="px-4 d-flex cursor-pointer">
        <Image
          alt="Tacvue Logo"
          className="mr-2"
          src="/images/NavLogo.png"
          width={162}
          height={48}
          onClick={() => router.push("/")}
        />
      </div>

      <div className="px-4">
        <a className="mx-4" onClick={() => router.push("/" + MARKETPLACE)}>
          Marketplace
        </a>
        <a className="mx-4" onClick={() => router.push("/" + COLLECTIBLES)}>
          Our Collectibles
        </a>

        {/* Should take you to display Card HQ */}
        <button className="btn btn-light rounded mx-4" id="walletButton">
          My Card
        </button>
      </div>
    </nav>
  );
}
