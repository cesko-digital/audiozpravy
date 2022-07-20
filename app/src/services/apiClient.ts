import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "../securePreferences";

import config from "../config";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: config.api.host,
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          keyArgs: [],
          merge(existing, incoming, { args }) {
            const merged = existing ? existing.edges : [];
            const { pageInfo } = incoming;
            const newEdges = [...merged, ...incoming.edges];
            return {
              pageInfo: pageInfo,
              edges: newEdges,
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  name: "audionews-mobile-client",
  cache: cache,
  connectToDevTools: true,
});

export default client;
