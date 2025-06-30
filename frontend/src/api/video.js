import axiosInstance from "./axiosInstance";

// 1. Create Video (formData with video & thumbnail)
export const createVideo = (formData) =>
  axiosInstance.post("/video/createVideo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 2. Get a single video by ID
export const getVideoById = (videoId) =>
  axiosInstance.get(`/video/getVideo/${videoId}`);

// 3. Update video
export const updateVideo = (videoData) =>
  axiosInstance.patch("/video/updateVideo", videoData);

// 4. Delete a video
export const deleteVideo = (videoId) =>
  axiosInstance.delete(`/video/delete/${videoId}`);

// 5. Get recommended videos
export const getRecommendedVideos = () =>
  axiosInstance.get("/video/recommendedVideos");

// 6. Get videos by category
export const getVideosByCategory = (category) =>
  axiosInstance.get(`/video/getVideoByCategory/${category}`);

// 7. Get trending videos (with optional page param)
export const getTrendingVideos = (page = 1) =>
  axiosInstance.get("/video/getTrandingVideos", {
    params: { page },
  });

export const addToWatchHistory  = (videoId) =>
  axiosInstance.post("/video/addToWatchHistory", {
    videoId:videoId
});
