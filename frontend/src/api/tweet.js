import axiosInstance from "./axiosInstance";

// 1. Create a new tweet
export const createTweet = (tweetData) =>
  axiosInstance.post("/tweet/createTweet", tweetData);

// 2. Get recommended tweets
export const getRecommendedTweets = () =>
  axiosInstance.get("/tweet/recommandedTweets");

// 3. Get all tweets for a user
export const getUserTweets = (userId) =>
  axiosInstance.get(`/tweet/getUserTweets/${userId}`);

// 4. Update a tweet
export const updateTweet = (tweetData) =>
  axiosInstance.patch("/tweet/updateTweet", tweetData);

// 5. Delete a tweet by ID
export const deleteTweet = (tweetId) =>
  axiosInstance.delete(`/tweet/deleteTweet/${tweetId}`);
