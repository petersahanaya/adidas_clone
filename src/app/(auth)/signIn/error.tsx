"use client";

import { ErrorComponent } from "@/app/(home)/error";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorComponent reset={reset} />;
}
