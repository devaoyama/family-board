import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((response) => {
        console.log(response);
      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div>Hello Next.js!</div>
      {isAuthenticated ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          ログアウト
        </button>
      ) : (
        <button onClick={loginWithRedirect}>ログイン</button>
      )}
    </React.Fragment>
  );
}
