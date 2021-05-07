import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredNotLogin: React.FC<Props> = ({ children, redirectTo = "/" }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  if (isAuthenticated) {
    router.push(redirectTo);
    return null;
  }

  return (
    <>
      {children}
      {isLoading && <LoadingSpinner />}
    </>
  );
};
