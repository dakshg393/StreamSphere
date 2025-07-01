import React, { useEffect, useState } from "react";
import { HorizontalCard, ProfileImg } from "../Components";
import { getSubscribedToList } from "../api/user";
import { getUserVideos } from "../api/video.js";

const Subscriptions = () => {
  const [subscriberList, setSubsciberList] = useState([]);
  const [subscriber, setSubcriber] = useState(null);
  const [subscriberVideos, setSubscriberVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch subscription list on mount
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await getSubscribedToList();
        const data = res.data?.data || [];

        setSubsciberList(data);
        if (data.length > 0) {
          setSubcriber(data[0]._id); // default selected
        } else {
          setMessage("You're not subscribed to any channels.");
        }
      } catch (error) {
        console.error("Error fetching subscription list:", error);
        setMessage("Failed to load your subscriptions.");
      }
    };

    fetchSubscribers();
  }, []);

  // Fetch videos for selected subscriber
  useEffect(() => {
    const fetchVideos = async () => {
      if (!subscriber) return;

      setLoading(true);
      try {
        const res = await getUserVideos(subscriber);
        const videos = res.data?.data || [];

        if (videos.length === 0) {
          setMessage("No videos found for this subscriber.");
          setSubscriberVideos([]);
        } else {
          setMessage("");
          setSubscriberVideos(videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setMessage("Error loading subscriber's videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [subscriber]);

  return (
    <section className="flex-1 h-screen w-full bg-white flex flex-col gap-6 p-4 justify-start items-start">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4">Subscriptions</h1>

        {/* Avatars */}
        <div className="min-h-[100px] w-full flex items-center overflow-x-auto gap-4 pl-2">
          {subscriberList.map((item) => (
            <ProfileImg
              key={item._id}
              size={`w-20 h-20 ${
                item._id === subscriber
                  ? "ring-4 ring-blue-500"
                  : "border border-gray-300"
              }`}
              image={item.avatar}
              onClick={() =>
                item._id !== subscriber && setSubcriber(item._id)
              }
            />
          ))}
        </div>
      </div>

      {/* Videos */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center gap-4 px-2">
        {loading && (
          <p className="text-blue-600 text-lg font-medium">Loading videos...</p>
        )}
        {!loading && message && (
          <p className="text-gray-500 text-lg font-medium">{message}</p>
        )}
        {!loading &&
          subscriberVideos.length > 0 &&
          subscriberVideos.map((video) => (
            <HorizontalCard key={video._id}  thumbnail = {video.thumbnail}  title = {video.title}  owner = {video.owner} views={video.views} createdAt = {video.createdAt} id = {video._id}  />
          ))}
      </div>
    </section>
  );
};

export default Subscriptions;
