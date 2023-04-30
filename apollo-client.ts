import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client'

// let client: ApolloClient<any> | null = null

// type Props = {}

export const getClient = () => {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
    cache: new InMemoryCache(),
  })

  return client
}
