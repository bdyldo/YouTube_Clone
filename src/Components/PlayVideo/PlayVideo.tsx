import React, { useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY } from "../../data";

const PlayVideo = ({ videoId }: any) => {
  const [apiData, setApiData] = useState(null);

  const fetchVideoData = async () => {
    // Fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.items[0]);
      })
      .catch((error) => console.error("Error fetching video data:", error));
  };

  return (
    <div className="play-video">
      {/* <video src = {video1} controls autoPlay muted/> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>Some Title</h3>
      <div className="play-video-info">
        <p>1000 Views &bull; 2 days ago</p>
        <div>
          <span>
            <img src={like} alt=""></img>125
          </span>
          <span>
            <img src={dislike} alt=""></img>2
          </span>
          <span>
            <img src={share} alt=""></img>Share
          </span>
          <span>
            <img src={save} alt=""></img>Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div className="publisher-info">
          <p>Channel Info</p>
          <span>100k Subscribers</span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>
      <div className="vid-description">
        <p>Some description</p>
        <p>Some other descriptions</p>
        <hr />
        <h4>100 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Some commenter <span>1 day ago</span>
            </h3>
            <p>Some comment</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
