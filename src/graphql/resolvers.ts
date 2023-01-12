import prisma from "@lib/prisma";
import { GraphQLDateTime } from "graphql-iso-date";
import bcrypt from "bcrypt";
import ImageKit from "imagekit";
const saltRounds = 10;

const imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || "",
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
	urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT || "",
});

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
		getThreads: async () => {
			const threads = await prisma.thread.findMany({
				orderBy: {
					createdAt: "desc",
				},
			});
			return threads;
		},
		getThreadsByAuthor: async (
			_: any,
			{ authorId }: { authordId: string }
		) => {
			const threads = await prisma.thread.findMany({
				where: {
					authorId,
				},
			});
			return threads;
		},
		getThreadById: async (_: any, { id }: { id: string }) => {
			const thread = await prisma.thread.findFirst({
				where: {
					id,
				},
			});
			return thread;
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
		images: async (parent: any) => {
			const res: string[] = [];
			const images = await prisma.images.findMany({
				where: {
					threadId: parent.id,
				},
				select: {
					imageUrl: true,
				},
			});
			images.forEach((image) => {
				res.push(image.imageUrl);
			});
			return res;
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
				images: { name: string; blob: string }[];
				tags: string[];
				author: string;
			}
		) => {
			try {
				const thread = await prisma.thread.create({
					data: {
						title,
						//@ts-ignore
						description,
						authorId: author,
					},
				});

				const promises = images.map(async (image) => {
					const upload = await imagekit.upload({
						file: image.blob,
						fileName: image.name,
						folder: `/threads/${thread.id}`,
						useUniqueFileName: true,
					});

					await prisma.images.create({
						data: {
							imageUrl: upload.filePath,
							threadId: thread.id,
						},
					});

					return upload;
				});

				await Promise.all(promises);

				return {
					code: 200,
					success: true,
					message: "Thread created successfully",
					thread,
				};
			} catch (error: any) {
				console.log(error);
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