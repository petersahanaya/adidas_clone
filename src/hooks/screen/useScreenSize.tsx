"use client";

import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [screenSize, setScreen] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setScreen({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [screenSize, setScreen];
};

export default useScreenSize;
