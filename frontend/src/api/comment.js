import axiosInstance from "./axiosInstance";

// 1. Create a new comment
export const createComment = (commentData) =>
  axiosInstance.post("/comment/createComment", commentData);

// 2. Get all comments (optionally pass videoId or tweetId in query)
export const getAllComments = (queryParams = {}) =>
  axiosInstance.get("/comment/getAllComments", {
    params: queryParams,
  });

// 3. Update a comment
export const updateComment = (commentData) =>
  axiosInstance.patch("/comment/updateComment", commentData);

// 4. Delete a comment
export const removeComment = (commentId) =>
  axiosInstance.delete("/comment/removeComment", {
    data: { commentId }, // DELETE with body (axios supports it like this)
  });
