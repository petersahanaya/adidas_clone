"use client";

import { ErrorComponent } from "@/app/(home)/error";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorComponent reset={reset} />;
};

export default ErrorPage;
