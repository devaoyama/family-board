import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div>Hello Next.js!</div>
      {!isAuthenticated && <button onClick={loginWithRedirect}>ボタン</button>}
    </React.Fragment>
  );
}
