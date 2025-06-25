import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}video/getVideo/${id}`,
          { withCredentials: true }
        );
        setVideoData(response.data.data);
      } catch (error) {
        console.error("Failed to load video", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!videoData) return <p>Loading...</p>;

  // Extract video ID from YouTube URL
  const extractYouTubeId = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        return parsed.pathname.slice(1);
      } else if (parsed.hostname.includes("youtube.com")) {
        return new URLSearchParams(parsed.search).get("v");
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const videoId = extractYouTubeId(videoData.videoFile);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{videoData.title}</h1>

      {embedUrl ? (
        <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden shadow">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Invalid video URL</p>
      )}

      <p className="text-gray-700 mt-4">{videoData.description}</p>
      <p className="text-sm text-gray-500">Views: {videoData.views.toLocaleString()}</p>
    </div>
  );
};

export default Video;
