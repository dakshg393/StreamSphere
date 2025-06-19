import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Replace with your API or local logic to fetch video details
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`); // Example API
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Failed to load video", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!videoData) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{videoData.title}</h1>
      <video controls className="w-full rounded-xl shadow">
        <source src={videoData.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-4 text-gray-700">{videoData.description}</p>
    </div>
  );
};

export default Video;
