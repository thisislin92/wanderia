import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://809a-182-3-37-56.ap.ngrok.io/',
  cache: new InMemoryCache()
})

export default client;