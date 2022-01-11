import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getAccessToken } from "../securePreferences"

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8000/graphql/',
})

const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken()
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        }
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    articles: {
                        keyArgs: [],
                        merge(existing, incoming, { args }) {
                            const merged = existing ? existing.edges : []
                            const { pageInfo } = incoming
                            const newEdges = [
                                ...merged,
                                ...incoming.edges
                            ]
                            return {
                                pageInfo: pageInfo,
                                edges: newEdges
                            }
                        },
                    },
                },
            },
        },
    }),
    connectToDevTools: true
})