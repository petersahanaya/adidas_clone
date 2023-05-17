"use client";

import { SessionProvider } from "next-auth/react";

const SessionProvide = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProvide;
