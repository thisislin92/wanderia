import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://25db-182-3-38-1.ap.ngrok.io',
  cache: new InMemoryCache()
})

export default client;