import React from "react";
import VideoCard from "@components/VideoCard";
import { YOUTUBE_EXAMPLE } from "@utils/constants";

export default function MarketplaceAssets() {
  return (
    <div className="container-fluid row">
      <p>Items listed on marketplace will go here</p>
      {YOUTUBE_EXAMPLE.map((item, key) => (
        <VideoCard key={key} url={item?.snippet?.thumbnails?.high?.url} editable={false} />
      ))}
    </div>
  );
}
