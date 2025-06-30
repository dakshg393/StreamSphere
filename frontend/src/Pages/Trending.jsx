import React, { useEffect, useState } from "react";
import { HorizontalCard } from "../Components/index.js";
import { Flame } from "lucide-react";
import axios from "axios";
import { getTrendingVideos } from "../api/video.js";


const Trending = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getTrendingVideos()
        // const response = await axios.get(`${import.meta.env.VITE_SERVER}video/getTrandingVideos`, {
        //   withCredentials: true,
        // });
        console.log(res.data.data);
        setVideos(res.data.data); // Adjust if response shape differs
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (

    <section className="w-full h-full flex flex-col">
      {/* Heading */}
      <div className="h-12 w-full  shadow flex items-center px-4">
        <h1 className="text-3xl font-semibold ">Trending</h1>
      </div>

      {/* Scrollable Video List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center gap-4">
        {videos.length === 0 ? (
          <h1>No Video found</h1>
        ) : (
          videos.map((video, index) => (
            <HorizontalCard
              key={video._id}
              id={video._id}
              thumbnail={video.thumbnail}
              title={video.title}
              owner={video.owner}
              views={video.views}
              createdAt={video.createdAt}
            />
          ))
        )}
      </div>
    </section>

  )
}

export default Trending