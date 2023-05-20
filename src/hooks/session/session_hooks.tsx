import { Session } from "next-auth";
import { create } from "zustand";

type SessionState = {
  session: Session | null;
  createSession: (user: Session) => void;
};

export const useAuthSession = create<SessionState>((set) => ({
  session: null,
  createSession: (user: Session) => set((state) => ({ session: user })),
}));
