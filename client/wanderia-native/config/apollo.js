import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://b340-114-79-0-255.ap.ngrok.io',
  cache: new InMemoryCache()
})

export default client;