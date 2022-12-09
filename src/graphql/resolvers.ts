import prisma from "@lib/prisma";
import { GraphQLDateTime } from "graphql-iso-date";

export const resolvers = {
	DateTime: GraphQLDateTime,

	Query: {
		getUser: async (
			_: any,
			{ email, password }: { email: string; password: string }
		) => {
			const user = await prisma.user.findFirst({
				where: {
					email: email,
					password: password,
				},
			});
			return user;
		},
		getUsers: async () => {
			const users = await prisma.user.findMany();
			return users;
		},
	},

	Mutation: {
		addUser: async (
			_: any,
			{
				name,
				email,
				password,
			}: { name: string; email: string; password: string }
		) => {
			const user = await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: password,
					image: `https://ui-avatars.com/api/?name=${name}&background=random&size=96&bold=true`,
				},
			});
			console.log("TEST");
			return user;
		},
		// login: async (
		// 	_: any,
		// 	{ email, password }: { email: string; password: string }
		// ) => {
		// 	const user = await prisma.user.update({
		// 		where: {
		// 			email: email,
		// 			password: password,
		// 		},
		// 		data: {
		// 			lastLogin: new Date(),
		// 		},
		// 	})

		// 	return user;
		// },
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
