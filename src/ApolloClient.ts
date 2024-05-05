import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:3006/graphql',  // Укажите URL вашего GraphQL сервера
  }),
  cache: new InMemoryCache()
});

export default client;
