import prisma from "@lib/prisma";
import { GraphQLDateTime } from "graphql-iso-date";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const resolvers = {
	DateTime: GraphQLDateTime,

	Query: {
		getUser: async (_: any, { id }: { id: string }) => {
			const user = await prisma.user.findFirst({
				where: {
					id,
				},
			});
			return user;
		},
		getUsers: async () => {
			const users = await prisma.user.findMany();
			return users;
		},
		threads: async () => {
			const threads = await prisma.thread.findMany();
			return threads;
		},
	},

	Thread: {
		author: async (parent: any) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.authorId,
				},
			});
			return user;
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
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			try {
				const user = await prisma.user.create({
					data: {
						name: name,
						email: email,
						password: hashedPassword,
						image: `https://ui-avatars.com/api/?name=${name}&background=random&size=96&bold=true`,
						isUMTMembership: email.match(/\@(ocean\.)?umt.edu.my/g)
							? true
							: false,
					},
				});
				return {
					code: 200,
					success: true,
					message: "User created successfully",
					user,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "User creation failed",
					user: null,
				};
			}
		},

		addThread: async (
			_: any,
			{
				title,
				description,
				images,
				tags,
				author,
			}: {
				title: string;
				description: string;
				images: string[];
				tags: string[];
				author: string;
			}
		) => {
			try {
				const thread = await prisma.thread.create({
					data: {
						title,
						description,
						authorId: author,
					},
				});
				return {
					code: 200,
					success: true,
					message: "Thread created successfully",
					thread,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Thread creation failed",
					thread: null,
				};
			}
		},
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
