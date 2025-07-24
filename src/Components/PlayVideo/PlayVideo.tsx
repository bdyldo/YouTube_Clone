import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import { value_converter } from "../../data.ts";
import moment from "moment";
import he from "he";

const PlayVideo = ({ videoId }: any) => {
  const [apiData, setApiData] = useState<any>(null);
  const [channelData, setChannelData] = useState<any>(null);
  const [commentsData, setCommentsData] = useState<any>([]);

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

  const fetchOtherData = async () => {
    // Fetching channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

    await fetch(channelData_url)
      .then((response) => response.json())
      .then((data) => {
        setChannelData(data.items[0]);
      })
      .catch((error) => console.error("Error fetching channel data:", error));

    // Fetching comments data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;

    await fetch(comment_url)
      .then((response) => response.json())
      .then((data) => {
        setCommentsData(data.items);
      })
      .catch((error) => console.error("Error fetching comments data:", error));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData && apiData.snippet && apiData.snippet.channelId) {
      fetchOtherData();
    }
  }, [apiData]);

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
      <h3>{apiData ? apiData?.snippet?.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData?.statistics?.viewCount
            ? value_converter(apiData.statistics.viewCount)
            : "16K"}
          Views &bull;{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : ""}
        </p>
        <div>
          <span>
            <img src={like} alt=""></img>
            {apiData ? value_converter(apiData?.statistics?.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt=""></img>
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
        <img
          src={
            channelData ? channelData?.snippet?.thumbnails?.default?.url : ""
          }
          alt=""
        />
        <div className="publisher-info">
          <p>
            {apiData
              ? apiData?.snippet?.channelTitle
              : "Failed to fetch channel title"}
          </p>
          <span>
            {channelData
              ? value_converter(channelData?.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button className="subscribe-btn">Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData?.snippet?.description.slice(0, 250)
            : "Description here"}
        </p>
        <p>Some other descriptions</p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData?.statistics?.commentCount) : 100}
        </h4>
        {commentsData.map((comment: any, index: number) => {
          return (
            <div key = {index} className="comment">
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                </h3>
                <p>{he.decode(comment.snippet.topLevelComment.snippet.textDisplay)}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
