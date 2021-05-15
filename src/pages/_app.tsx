import React, { useState } from "react";
import { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/globals.css";
import { Apollo } from "src/components/common/Apollo";
import { CurrentFamilyContext } from "src/contexts/currentFamilyContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currentFamilyId, setCurrentFamilyId] = useState<number>();

  return (
    <div suppressHydrationWarning={true}>
      <CssBaseline />
      {typeof window === "undefined" ? null : (
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN!}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
          redirectUri={window.location.origin}
          audience={"https://family-board.app/login"}
        >
          <Apollo>
            <CurrentFamilyContext.Provider
              value={{ id: currentFamilyId, setId: setCurrentFamilyId }}
            >
              <Component {...pageProps} />
            </CurrentFamilyContext.Provider>
          </Apollo>
        </Auth0Provider>
      )}
    </div>
  );
}
