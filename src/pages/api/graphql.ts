// import { ApolloServer } from "apollo-server-express";
// import { Router } from "express";
// import { typeDefs } from "@gql/schema";
// import { resolvers } from "@gql/resolvers";
// import { NextApiRequest, NextApiResponse } from "next";

// const corsOptions = {
// 	origin: process.env.APOLLO_SERVER || "http://localhost:3000",
// 	credentials: true,
// };

// function runMiddleware(
// 	req: NextApiRequest,
// 	res: NextApiResponse<any>,
// 	fn: Router
// ) {
// 	return new Promise((resolve, reject) => {
// 		//@ts-ignore
// 		fn(req, res, (result) => {
// 			if (result instanceof Error) {
// 				return reject(result);
// 			}

// 			return resolve(result);
// 		});
// 	});
// }

// export const config = {
// 	api: {
// 		bodyParser: false,
// 		responseLimit: false
// 	},
// };

// export default (async function handler(req: any, res: any) {
// 	const apolloServer = new ApolloServer({
// 		typeDefs,
// 		resolvers,
// 		//@ts-ignore
// 		cors: corsOptions,
// 	});
// 	await apolloServer.start();

// 	const apolloMiddleware = apolloServer.getMiddleware({
// 		path: "/api/graphql",
// 		bodyParserConfig: {
// 			limit: "100mb",
// 		},
// 	});
// 	await runMiddleware(req, res, apolloMiddleware);
// });


//Approach 2
// import { ApolloServer } from "apollo-server-micro";
// import { typeDefs } from "@gql/schema";
// import { resolvers } from "@gql/resolvers";
// import { MicroRequest } from "apollo-server-micro/dist/types";
// import { ServerResponse, IncomingMessage } from "http";
// import { createContext } from "@gql/context";
// import Cors from "micro-cors";
// import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";

// const cors = Cors({
// 	allowMethods: ["POST", "OPTIONS"],
// 	allowHeaders: ["Content-Type", "Origin", "Accept"],
// 	origin: "*",
// });

// const apolloServer = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// 	context: createContext,
// 	csrfPrevention: true,
// 	cache: "bounded",
// 	plugins: [ApolloServerPluginLandingPageDisabled()],
// });

// const startServer = apolloServer.start();

// export default cors(async (
// 	req: MicroRequest,
// 	res: ServerResponse<IncomingMessage>
// ) => {
// 	if (req.method === "OPTIONS") {
// 		res.end();
// 		return false;
// 	}

// 	await startServer;
// 	await apolloServer.createHandler({
// 		path: "/api/graphql",
// 	})(req, res);
// });

// export const config = {
// 	api: {
// 		bodyParser: false,
// 		maxBodyLength: 209715200,
// 	},
// };

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