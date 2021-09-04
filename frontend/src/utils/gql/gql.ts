import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "@config/app";

export const client = new ApolloClient({
    uri: config.graphqlUri,
    cache: new InMemoryCache(),
    credentials: "include",
});
