import React from "react";
import "./video.css";
import PlayVideo from "../../../Components/PlayVideo/PlayVideo";
import Recommended from "../../../Components/Recommended/Recommended";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams<{
    videoId: string;
    categoryId: string;
  }>();
  console.log("Loaded Video", categoryId, videoId);

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Video;
