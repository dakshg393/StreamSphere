import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp } from "lucide-react";

const Video = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}video/getVideo/${id}`,
          { withCredentials: true }
        );
        setVideoData(response.data.data);
        setLikes(response.data.data.likes || 0); // default to 0 if undefined
      } catch (error) {
        console.error("Failed to load video", error);
      }
    };

    fetchVideo();
  }, [id]);

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

  const handleLike = async () => {
    if (isLiked) return;

    setLikes((prev) => prev + 1);
    setIsLiked(true);

    // Optional: persist to backend
    // await axios.post(`${import.meta.env.VITE_SERVER}video/like/${videoData._id}`, {}, { withCredentials: true });
  };

  if (!videoData) return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const videoId = extractYouTubeId(videoData.videoFile);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-4 py-8">
      {/* Main video section */}
      <div className="flex-1">
        {embedUrl ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-4">
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

        <h1 className="text-2xl font-bold mb-2">{videoData.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>
            {videoData.views.toLocaleString()} views •{" "}
            {new Date(videoData.createdAt).toLocaleDateString("en-IN")}
          </span>

          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`flex items-center gap-2 text-sm px-4 py-1 rounded-full transition ${
              isLiked ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <ThumbsUp size={16} />
            {likes}
          </button>
        </div>

        <p className="text-gray-800 whitespace-pre-line">{videoData.description}</p>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[350px] space-y-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Suggested Videos</h2>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <p className="text-sm text-gray-500">Comments feature coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Video;
