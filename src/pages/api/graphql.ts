import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "@gql/schema";
import { resolvers } from "@gql/resolvers";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";
import { createContext } from "@gql/context";
import Cors from "micro-cors";

const cors = Cors({
	allowMethods: ["GET", "POST", "OPTIONS"],
	origin: "*",
});

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
	req: MicroRequest,
	res: ServerResponse<IncomingMessage>
) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}

	await startServer;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};
