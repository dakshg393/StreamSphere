import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VerticalCard from "../Components/Card/VerticalCard";
import {
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../api/subscription.js";
import { getUserChannelProfile } from "../api/user.js";
import { getUserVideos } from "../api/video.js";

const Account = () => {
  const { _id } = useParams();

  const [channelData, setChannelData] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true);

        const channelRes = await getUserChannelProfile(_id);
        setChannelData(channelRes.data.data[0]);

        const videoRes = await getUserVideos(_id);
        console.log(videoRes.data)
        setUserVideos(videoRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [_id]);

  const handleSubscription = async () => {
    if (!channelData) return;

    try {
      setSubscribing(true);

      if (channelData.isSubscribedTo) {
        await unsubscribeFromChannel(_id);
        setChannelData((prev) => ({
          ...prev,
          isSubscribedTo: false,
          subscribersCount: prev.subscribersCount - 1,
        }));
      } else {
        await subscribeToChannel(_id);
        setChannelData((prev) => ({
          ...prev,
          isSubscribedTo: true,
          subscribersCount: prev.subscribersCount + 1,
        }));
      }
    } catch (err) {
      console.error("Subscription failed:", err.response?.data?.message);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!channelData) return <p className="text-center text-gray-400">No channel found.</p>;

  return (
    <section className="w-full h-full flex flex-col">
      {/* Channel Header */}
      <div className="w-full shadow rounded-2xl border px-4 bg-white">
        <div className="p-2 drop-shadow-2xl">
          {/* Cover Image */}
          <div className="w-full h-40">
            <img
              src={channelData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>

          {/* Avatar & Info */}
          <div className="h-30 px-5 flex items-start gap-6">
            <img
              src={channelData.avatar}
              alt="Avatar"
              className="h-32 aspect-square -translate-y-1/2 rounded-full border-4 border-white"
            />
            <div className="mt-2">
              <h1 className="text-xl font-bold">{channelData.fullName}</h1>
              <h2 className="text-gray-600">@{channelData.userName}</h2>
              <h3 className="text-sm text-gray-500">
                Subscribers: {channelData.subscribersCount}
              </h3>
              <button
                onClick={handleSubscription}
                disabled={subscribing}
                className={`mt-2 px-4 py-1 rounded-full text-white transition hover:cursor-pointer ${
                  channelData.isSubscribedTo
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {subscribing
                  ? "Please wait..."
                  : channelData.isSubscribedTo
                  ? "Subscribed"
                  : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="flex-1  overflow-y-auto px-6 py-6 flex flex-wrap gap-4 items-center">
        {userVideos?.length > 0 ? (
          userVideos.map((video) => (
            <VerticalCard key={video._id}  thumbnail = {video.thumbnail}  title = {video.title}  owner = {video.owner} views={video.views} createdAt = {video.createdAt} id = {video._id}  />
          ))
        ) : (
          <p className="text-gray-400 italic text-center w-full">No videos uploaded yet.</p>
        )}
      </div>
    </section>
  );
};

export default Account;
