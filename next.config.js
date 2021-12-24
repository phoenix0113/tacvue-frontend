/** @type {import('next').NextConfig} */
require("dotenv").config();
module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || "",
    PINATA_API_KEY: process.env.PINATA_API_KEY || "",
    PINATA_API_SECRET: process.env.PINATA_API_SECRET || "",
  },
  plugins: [["styled-components", { ssr: true }]],
};
