"use client";

import { useEffect, useState } from "react";

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [onMount, setOnMount] = useState(false);

  useEffect(() => {
    setOnMount(true);
  }, []);

  if (onMount) {
    return <>{children}</>;
  }

  return null;
};

export default ClientOnly;
