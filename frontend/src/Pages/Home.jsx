import React, { useEffect, useState } from "react";
import { ProfileImg, HorizontalCard, VerticalCard } from "../Components/index.js";
import { categoryItems } from "../Utils/MainUtils.jsx";
import axios from "axios";
import useUserStore from "../Store/user.Store.js";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const path = import.meta.env.VITE_SERVER;
  const user = useUserStore((state)=> state.user)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${path}video/recommendedVideos`, {
          withCredentials: true,
        });
        console.log(`This is user ${JSON.stringify(user)}`)
        console.log(response.data);
        setVideos(response.data.data); // Adjust if response shape differs
      } catch (error) {
        console.log(error)
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideos();
  }, [path]);

  return (
    <section className="h-screen bg-white flex flex-col justify-center items-center">
      <div className="h-16 w-full gap-x-4 pl-10 font-bold flex justify-start items-center overflow-x-auto flex-wrap">
        {categoryItems.map((item) => (
          <button key={item.name} className="whitespace-nowrap">
            {item.name}
          </button>
        ))}
      </div>

      <div className="w-full h-full gap-4 flex flex-wrap flex-1 justify-center items-center overflow-scroll">
        {videos.length === 0 ? (
          <h1>No Video Recommendations Available </h1>
         
        ) : (
          videos.map((video, index) => (
            <VerticalCard key={video._id || index} video={video} />
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
