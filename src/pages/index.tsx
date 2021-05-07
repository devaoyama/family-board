import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RequiredLogin } from "src/components/common/RequiredLogin";

export default function Home() {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((response) => {
        console.log(response);
      });
    }
  }, [isAuthenticated]);

  return (
    <RequiredLogin>
      <div>Hello Next.js!</div>
      <button
        onClick={() => {
          logout();
        }}
      >
        ログアウト
      </button>
    </RequiredLogin>
  );
}
