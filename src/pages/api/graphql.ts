import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createContext } from '@gql/context';
import { resolvers } from '@gql/resolvers';
import { typeDefs } from '@gql/schema';

const server = new ApolloServer({
	resolvers,
	typeDefs,
});

export default startServerAndCreateNextHandler(server, {
	context: createContext,
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '100mb' // Set desired value here
		}
	}
}