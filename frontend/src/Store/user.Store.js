// // Store/user.Store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-session-storage',
      getStorage: () => sessionStorage, // 👈 switch here
    }
  )
);

export default useUserStore;
