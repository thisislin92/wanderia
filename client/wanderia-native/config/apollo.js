import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://025a-114-79-3-239.ap.ngrok.io',
  cache: new InMemoryCache()
})

export default client;