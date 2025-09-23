import { IUser } from "@/interfaces";
import { create } from "zustand";

export interface IUsersStore {
  user: IUser | null;
  setUser: (payload: IUser) => void;
}

export const useUsersStore = create<IUsersStore>((set) => ({
  user: null,
  setUser: (payload: IUser) => set(() => ({ user: payload })),
}));