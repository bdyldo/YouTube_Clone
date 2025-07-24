import React, { useState, useEffect } from "react";
import "./Recommended.css";
import { API_KEY } from "../../data";
import { value_converter } from "../../data.ts";

const Recommended = ({ categoryId }: any) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideo_url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.items);
      })
      .catch((error) => console.error("Error fetching related videos:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="recommended">
      {apiData.map((item: any, index) => {
        return (
          <div key = {index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_converter(item.statistics.viewCount)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recommended;
