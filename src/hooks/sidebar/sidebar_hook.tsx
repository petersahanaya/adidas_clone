"use client";

import { create } from "zustand";

type UseSideBarState = {
  isOpen: boolean;
  toggleSideBar: () => void;
};

export const useSidebar = create<UseSideBarState>((set) => ({
  isOpen: false,
  toggleSideBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
