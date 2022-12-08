import prisma from "@lib/prisma";
import { GraphQLDateTime } from "graphql-iso-date";

export const resolvers = {
	DateTime: GraphQLDateTime,

	Query: {
		user: async () => {
			const users = await prisma.user.findMany();
			return users;
		},
	},

	Mutation: {
		//@ts-ignore
		addUser: async (_: any, { name, email, password }) => {
			const user = await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: password,
				},
			});
			return user;
		},
		// links: async () => await prisma.link.findMany(),
	},
};

// export const resolvers = {
//     Query: {
//         user: async () => {
//             const users = await prisma.user.findMany();
//             return users;
//         }
//     },
//     Mutation: {
//         createUser: async (parent, args, context, info) => {
//             const user = await prisma.user.create({
//                 data: {
//                     name: args.name,
//                     email: args.email,
//                 }
//             });
//             return user;
//         }
//     }
// };
