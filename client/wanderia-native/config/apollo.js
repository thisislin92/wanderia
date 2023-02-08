import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dcb0-114-79-6-27.ap.ngrok.io/',
  cache: new InMemoryCache()
})

export default client;