"use client";

import { ErrorComponent } from "../(home)/error";

const ErrorFavoritePage = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return <ErrorComponent reset={reset} />;
};

export default ErrorFavoritePage;
