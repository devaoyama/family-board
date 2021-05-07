import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredLogin: React.FC<Props> = ({ children, redirectTo = "/login" }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    router.push(redirectTo);
    return null;
  }

  return <>{children}</>;
};
