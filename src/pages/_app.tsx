import React from "react";
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import "../styles/globals.css";
import { Apollo } from "src/components/common/Apollo";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning={true}>
      {typeof window === "undefined" ? null : (
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN!}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
          redirectUri={window.location.origin}
        >
          <Apollo>
            <Component {...pageProps} />
          </Apollo>
        </Auth0Provider>
      )}
    </div>
  );
}
