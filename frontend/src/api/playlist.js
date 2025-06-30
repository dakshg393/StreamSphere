import axiosInstance from "./axiosInstance";

// 1. Create a new playlist
export const createPlaylist = (playlistData) =>
  axiosInstance.post("/playlist/createPlaylist", playlistData);

// 2. Get all playlists for current user
export const getAllPlaylist = () =>
  axiosInstance.get("/playlist/getAllPlaylist");

// 3. Get details of a specific playlist (pass as query param)
export const getPlaylistDetails = (queryParams = {}) =>
  axiosInstance.get("/playlist/getPlaylistDetails", {
    params: queryParams, // e.g., { playlistId: 'abc123' }
  });

// 4. Add a video to a playlist
export const addVideoToPlaylist = (data) =>
  axiosInstance.patch("/playlist/addVideoToPlaylist", data);

// 5. Remove a video from a playlist
export const removeVideoFromPlaylist = (data) =>
  axiosInstance.patch("/playlist/removeVideoFromPlaylist", data);

// 6. Delete a playlist
export const deletePlaylist = (playlistId) =>
  axiosInstance.delete("/playlist/deletePlaylist", {
    data: { playlistId }, // DELETE with body
  });
