import React, { useEffect, useState } from "react";
import { HorizontalCard } from "../Components/index.js";
import { Flame } from "lucide-react";
import axios from "axios";


const Trending = () => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}video/getTrandingVideos`, {
          withCredentials: true,
        });
        console.log(response.data.data);
        setVideos(response.data.data); // Adjust if response shape differs
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideos();
  }, []);

    return (
        <section className="w-full h-screen  bg-white flex flex-wrap gap-6 p-2  mb-2  items-center overflow-y-auto">
            <h1 className="text-3xl font-bold p-4  flex items-center">Tending<span className="inline-block "><Flame size={60} color="red"/></span></h1>
            <div className="w-full h-screen  bg-white flex flex-wrap gap-6 p-2  mb-2 justify-center items-center "> 
              
              {videos.length===0?(<h1>No Video found</h1>):(
                videos.map((video,index)=>(
                    <HorizontalCard key={index}  thumbnail={video.thumbnail} title={video.title} owner={video.owner} views={video.views} createdAt={video.createdAt}/>
                ))
              )}
            </div>

        </section>
    )
}

export default Trending