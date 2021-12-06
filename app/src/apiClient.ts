import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

var inMemoryToken: string = null

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8000/graphql/',
})

const authLink = setContext((_, { headers }) => {
    console.info('authLink')
    return {
        headers: {
            ...headers,
            authorization: inMemoryToken ? `Bearer ${inMemoryToken}` : "",
        }
    }
})

export const setAccessToken = (token: string) => {
    inMemoryToken = token
}

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