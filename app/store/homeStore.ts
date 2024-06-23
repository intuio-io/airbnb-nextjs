import { create } from "zustand";

interface HomeStore {
    user: any; 
    addUser: (user: any) => void;
    addFavoriteId: (id: string) => void;
    removeFavoriteId: (id: string) => void;
    reset: () => void;
}

const useHomeStore = create<HomeStore>((set, get) => ({
    user: null,
    addUser: (user: any) => {
        set({ user });
      },

    addFavoriteId: (id: string) => {
        const user = get().user;
          const favoriteIds = user.favoriteIds || [];
          if (!favoriteIds.includes(id)) {
            const updatedUser = {
              ...user,
              favoriteIds: [...favoriteIds, id],
            };
            set({ user: updatedUser });
          }
      },

      removeFavoriteId: (id: string) => {
        const user = get().user;
          const favoriteIds = user.favoriteIds || [];
          const updatedFavoriteIds = favoriteIds.filter((favoriteId: string) => favoriteId !== id);
          const updatedUser = {
            ...user,
            favoriteIds: updatedFavoriteIds,
          };
          set({ user: updatedUser });
      },

      reset: () => {
        set({
            user: null,
        })
      }
}))


export default useHomeStore;