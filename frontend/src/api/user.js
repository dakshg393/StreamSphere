import axiosInstance from "./axiosInstance";

// 1. Register User with avatar & coverImage
export const registerUser = (formData) =>
  axiosInstance.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 2. Login
export const loginUser = (credentials) =>
  axiosInstance.post("/users/login", credentials);

// 3. Logout
export const logoutUser = () =>
  axiosInstance.post("/users/logout");

// 4. Refresh Token
export const refreshToken = () =>
  axiosInstance.post("/users/refresh-token");

// 5. Change Password
export const changePassword = (data) =>
  axiosInstance.post("/users/change-password", data);

// 6. Get Current User Info
export const getCurrentUser = () =>
  axiosInstance.get("/users/current-user");

// 7. Update Account Details
export const updateAccountDetails = (updates) =>
  axiosInstance.patch("/users/update-account", updates);

// 8. Update Avatar
export const updateUserAvatar = (avatarFile) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  return axiosInstance.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 9. Update Cover Image
export const updateUserCoverImage = (coverFile) => {
  const formData = new FormData();
  formData.append("coverImage", coverFile);

  return axiosInstance.patch("/users/cover-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 10. Get User Channel Profile by ID
export const getUserChannelProfile = (_id) =>
  axiosInstance.get(`/users/c/${_id}`);

// 11:Get Subscriber List
export const getSubscribedToList = () =>
  axiosInstance.get(`/users/getSubscribedToList`);

// 12. Get Watch History
export const getWatchHistory = () =>
  axiosInstance.get("/users/history");
