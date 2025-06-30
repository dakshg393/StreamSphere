// import axiosInstance from "./axiosInstance";

// // 1. Register User with avatar & coverImage
// export const registerUser = (formData) =>
//   axiosInstance.post("/user/register", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// // 2. Login
// export const loginUser = (credentials) =>
//   axiosInstance.post("/user/login", credentials);

// // 3. Logout
// export const logoutUser = () =>
//   axiosInstance.post("/user/logout");

// // 4. Refresh Token
// export const refreshToken = () =>
//   axiosInstance.post("/user/refresh-token");

// // 5. Change Password
// export const changePassword = (data) =>
//   axiosInstance.post("/user/change-password", data);

// // 6. Get Current User Info
// export const getCurrentUser = () =>
//   axiosInstance.get("/user/current-user");

// // 7. Update Account Details
// export const updateAccountDetails = (updates) =>
//   axiosInstance.patch("/user/update-account", updates);

// // 8. Update Avatar
// export const updateUserAvatar = (avatarFile) => {
//   const formData = new FormData();
//   formData.append("avatar", avatarFile);

//   return axiosInstance.patch("/user/avatar", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

// // 9. Update Cover Image
// export const updateUserCoverImage = (coverFile) => {
//   const formData = new FormData();
//   formData.append("coverImage", coverFile);

//   return axiosInstance.patch("/user/cover-image", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };

// // 10. Get User Channel Profile by ID
// export const getUserChannelProfile = (_id) =>
//   axiosInstance.get(`/user/c/${_id}`);

// // 11. Get Watch History
// export const getWatchHistory = () =>
//   axiosInstance.get("/user/history");


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscribeToChannel, unsubscribeFromChannel } from "../api/subscription.js";
import { getUserChannelProfile } from "../api/user.js";
import VerticalCard from "../Components/Card/VerticalCard";

const Account = () => {
  const { _id } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  // Fetch user channel by ID
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await getUserChannelProfile(_id);
        setChannelData(res.data.data[0]); // assuming array return
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [_id]);

  // Handle subscribe/unsubscribe
  const subscribeHandler = async () => {
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
        <div className="w-full drop-shadow-2xl p-2">
          {/* Cover Image */}
          <div className="w-full h-40">
            <img
              src={channelData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>

          {/* Avatar + Info */}
          <div className="h-40 px-5 flex items-start gap-6">
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
                onClick={subscribeHandler}
                disabled={subscribing}
                className={`mt-2 px-4 py-1 rounded-full border text-white ${
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

      {/* Videos Section (optional placeholder) */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 items-center">
        {/* Placeholder or real videos list */}
        {/* You can loop through channelData.videos if it exists */}
        {/* channelData.videos?.map(video => <VerticalCard key={video._id} video={video} />) */}
        <p className="text-gray-400 italic">This user's uploaded videos will appear here.</p>
      </div>
    </section>
  );
};

export default Account;
