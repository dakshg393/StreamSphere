import axiosInstance from "./axiosInstance";

// 1. Create a like (e.g., for a video or tweet)
export const createLike = (likeData) =>
  axiosInstance.post("/like/createLike", likeData);

// 2. Get like details (e.g., for a specific item)
export const getLikesDetails = (queryParams = {}) =>
  axiosInstance.get("/like/getLikesDetails", {
    params: queryParams, // like { targetId: 'xyz', type: 'video' }
  });

// 3. Delete a like (by passing targetId/type in body)
export const deleteLike = (likeData) =>
  axiosInstance.delete("/like/deleteLike", {
    data: likeData, // axios allows body with DELETE method
  });
