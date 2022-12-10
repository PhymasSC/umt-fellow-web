import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: process.env.APOLLO_SERVER || "http://localhost:3000/api/graphql",
	cache: new InMemoryCache(),
});
