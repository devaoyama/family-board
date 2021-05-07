import React, { useMemo } from "react";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
});

export const Apollo: React.FC = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useMemo(() => {
    const authLink = setContext(async (_, { headers }) => {
      let token = "";
      if (isAuthenticated) {
        token = await getAccessTokenSilently({ audience: "https://hasura.io/learn" });
      }
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });
  }, [isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
