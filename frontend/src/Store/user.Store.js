
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//       logout: () => set({ user: null }),
//     }),
//     {
//       name: 'user-session-storage',
//       storage: {
//         getItem: (key) => sessionStorage.getItem(key),
//         setItem: (key, value) => sessionStorage.setItem(key, value),
//         removeItem: (key) => sessionStorage.removeItem(key),
//       },
//     }
//   )
// );

// export default useUserStore;

// src/store/useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
