import { create } from "zustand";

type usePostState = {
  isOpen: boolean;
  togglePostComponent: (x: boolean) => void;
};

export const usePostComponent = create<usePostState>((set) => ({
  isOpen: false,
  togglePostComponent: (isOpen: boolean) => set(() => ({ isOpen })),
}));
