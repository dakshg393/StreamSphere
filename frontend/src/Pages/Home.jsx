import React, { useEffect, useState } from "react";
import { ProfileImg, HorizontalCard, VerticalCard } from "../Components/index.js";
import { categoryItems } from "../Utils/MainUtils.jsx";
import axios from "axios";
import useUserStore from "../Store/user.Store.js";
import { getVideosByCategory } from "../api/video.js";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const path = import.meta.env.VITE_SERVER;
  const user = useUserStore((state) => state.user)

  const [category, setCategory] = useState(null)


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${path}video/recommendedVideos`, {
          withCredentials: true,
        });
        console.log(`This is user ${JSON.stringify(user)}`)
        console.log(res.data);
        setVideos(res.data.data); // Adjust if response shape differs
      } catch (error) {
        console.log(error)
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideos();
  }, [path]);

  useEffect(() => {
    if (!category) return;

    const fetchByCategory = async () => {
      try {
        console.log("Fetching category:", category);
        const res = await getVideosByCategory(category);
        console.log(res.data.data)
        setVideos(res.data.data);
      } catch (error) {
        console.error("Error fetching videos by category:", error);
      }
    };

    fetchByCategory();
  }, [category]);

  return (
    <section className="h-screen bg-white flex flex-col justify-center items-center">
      <div className="h-16 w-full gap-x-4 pl-10 font-bold flex justify-start items-center overflow-x-auto flex-wrap">
        {categoryItems.map((item) => (
          <button onClick={() => setCategory(item.name)} key={item.name} className={`${item.name == category ? "bg-primary-color":""} hover:cursor-pointer hover:bg-secondary-color whitespace-nowrap rounded-2xl p-1`}>
            {item.name}
          </button>
        ))}
      </div>

      <div className="w-full h-full gap-4 flex flex-wrap flex-1 justify-center items-center overflow-scroll">
        
        
        {videos.length === 0 ? (
          <h1>No Video Recommendations Available </h1>

        ) : (
          videos.map((video, index) => (
            <VerticalCard key={video._id}  thumbnail = {video.thumbnail}  title = {video.title}  owner = {video.owner} views={video.views} createdAt = {video.createdAt} id = {video._id}  />
          ))
        )}



      </div>
    </section>
  );
};

export default Home;
