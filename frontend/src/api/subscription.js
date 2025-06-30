import axiosInstance from "./axiosInstance";

// 1. Subscribe to a channel
export const subscribeToChannel = (channelId) =>
  axiosInstance.post(`/subscription/subscribe/${channelId}`);

// 2. Unsubscribe from a channel
export const unsubscribeFromChannel = (channelId) =>
  axiosInstance.delete(`/subscription/unSubscribe/${channelId}`);
