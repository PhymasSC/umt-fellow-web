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

enum VoteType {
	UPVOTE = "UPVOTE",
	DOWNVOTE = "DOWNVOTE",
}

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
		getUsers: async (
			_: any,
			{ limit, offset }: { limit: number; offset: number }
		) => {
			const users = await prisma.user.findMany({
				take: limit,
				skip: offset,
			});
			return users;
		},
		getUsersByName: async (
			_: any,
			{ name, limit, offset }: { name: string, limit: number; offset: number },
		) => {
			const users = await prisma.user.findMany({
				where: {
					name: {
						contains: name,
					},
				},
				take: limit,
				skip: offset,
			});
			return users;
		},

		getThreads: async () => {
			const threads = await prisma.thread.findMany({
				orderBy: {
					updated_at: "desc",
				},
			});
			return threads;
		},
		getThreadsByAuthor: async (
			_: any,
			{ authorId }: { authorId: string }
		) => {
			const threads = await prisma.thread.findMany({
				where: {
					authorId: authorId,
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
		getThreadVotes: async (_: any, { threadId }: { threadId: string }) => {
			const votes = await prisma.threadvotes.findMany({
				where: {
					thread_id: threadId,
				},
			});
			return votes;
		},
		getThreadUpvotesAndDownvotes: async (
			_: any,
			{ threadId }: { threadId: string }
		) => {
			const upvotes = await prisma.threadvotes.count({
				where: {
					thread_id: threadId,
					vote: VoteType.UPVOTE,
				},
			});

			const downvotes = await prisma.threadvotes.count({
				where: {
					thread_id: threadId,
					vote: VoteType.DOWNVOTE,
				},
			});

			return [upvotes, downvotes];
		},

		getCommunities: async () => {
			const communities = await prisma.community.findMany();
			return communities;
		},
		getCommunityById: async (_: any, { id }: { id: string }) => {
			const community = await prisma.community.findFirst({
				where: {
					id,
				},
			});
			return community;
		},


	},

	Vote: {
		thread: async (parent: any) => {
			const thread = await prisma.thread.findFirst({
				where: {
					id: parent.thread_id,
				},
			});
			return thread;
		},

		user: async (parent: any) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.user_id,
				},
			});
			return user;
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
			const images: {
				imageUrl: string;
			}[] = await prisma.images.findMany({
				where: {
					threadId: parent.id,
				},
			});
			return images;
		},
	},

	Community: {
		creatorId: async (parent: any) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.creatorId,
				},
			});
			return user;
		}
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
				console.log(email)
				console.log(email.match(/\@(ocean\.)?umt.edu.my/g))
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

		editUser: async (
			_: any,
			attr: {
				id: string;
				name: string;
				email: string;
				password: string;
				image: string;
				facebookLink: string;
				twitterLink: string;
				instagramLink: string;
				githubLink: string;
				dribbbleLink: string;
				youtubeLink: string;
				telegramLink: string;
				tiktokLink: string;
				redditLink: string;
				snapchatLink: string;
				about: string;
				faculty: string;
				major: string;
				year: number;
				cgpa: number;
			}
		) => {
			// const hashedPassword = await bcrypt.hash(password, saltRounds);
			const { id, ...rest } = attr
			if (rest.password) rest.password = await bcrypt.hash(rest.password, saltRounds)
			try {
				const user = await prisma.user.update({
					where: {
						id,
					},
					data: rest,
				});
				return {
					code: 200,
					success: true,
					message: "User edited successfully",
					user,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "User edit failed",
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
				images: { name: string; blob: string; isExisting: boolean; isDeleted: boolean }[];
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
							id: upload.fileId,
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

		updateThread: async (
			_: any,
			{
				id,
				title,
				description,
				images,
				tags,
			}: {
				id: string;
				title: string;
				description: string;
				images: { id?: string; name?: string; blob?: string; url?: string, isExisting?: boolean, isDeleted: boolean }[];
				tags: string[];
			}
		) => {
			try {
				const thread = await prisma.thread.update({
					where: {
						id,
					},
					data: {
						title,
						//@ts-ignore
						description,
						updated_at: new Date(),
					},
				});
				if (images.length > 0) {
					const promises = images.map(async (image) => {
						if (image.isDeleted) {
							console.log("Delete")
							console.log(image)
							const deletion = await imagekit.deleteFile(image.id || "");
							await prisma.images.delete({
								where: {
									id: image.id || "",
								},
							});
							return deletion
						}
						if (image.isExisting && image.url) {
							console.log("Exist but not deleted")
							console.log(image)
							const res = await imagekit.getFileDetails(image.id || "")
							console.log(res)
							return res
						};
						const upload = await imagekit.upload({
							file: image?.blob || "",
							fileName: image?.name || "",
							folder: `/threads/${thread.id}`,
							useUniqueFileName: true,
						});

						await prisma.images.create({
							data: {
								id: upload.fileId,
								imageUrl: upload.filePath,
								threadId: thread.id,
							},
						});

						return upload;
					});

					await Promise.all(promises);
				}

				return {
					code: 200,
					success: true,
					message: "Thread updated successfully",
					thread,
				};
			} catch (error: any) {
				console.log(error);
				return {
					code: 1,
					success: false,
					message: error.message || "Thread update failed",
					thread: null,
				};
			}
		},

		deleteThread: async (_: any, { id }: { id: string }) => {
			try {
				const images = await prisma.images.deleteMany({
					where: {
						threadId: id,
					},
				});
				if (images.count > 0)
					await imagekit.deleteFolder(`/threads/${id}`);
				const thread = await prisma.thread.delete({
					where: {
						id,
					},
				});
				return {
					code: 200,
					success: true,
					message: "Thread deleted successfully",
					thread,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Thread deletion failed",
					thread: null,
				};
			}
		},

		voteThread: async (
			_: any,
			{
				threadId,
				userId,
				voteType,
			}: { threadId: string; userId: string; voteType: VoteType }
		) => {
			try {
				const vote = await prisma.threadvotes.upsert({
					where: {
						user_id_thread_id: {
							thread_id: threadId,
							user_id: userId,
						},
					},
					update: {
						vote: voteType,
						updated_at: new Date(),
					},
					create: {
						thread_id: threadId,
						user_id: userId,
						vote: voteType,
					},
				});
				const data = await prisma.threadvotes.groupBy({
					by: ["vote"],
					where: {
						thread_id: threadId,
					},
					_count: {
						_all: true,
					},
				});
				return {
					code: 200,
					success: true,
					message: "Vote successful",
					vote,
					upvotes:
						data[0]?.vote === "UPVOTE"
							? data[0]?._count._all
							: data[1]?._count._all || 0,
					downvotes:
						data[0]?.vote === "DOWNVOTE"
							? data[0]?._count._all
							: data[1]?._count._all || 0,
				};
			} catch (error: any) {
				console.log("FAILED");
				return {
					code: 1,
					success: false,
					message: error.message || "Vote failed",
					vote: null,
				};
			}
		},

		addCommunity: async (
			_: any,
			{
				name,
				description,
				avatar,
				banner,
				creatorId
			}: {
				name: string,
				description: string,
				avatar: string,
				banner: string
				creatorId: string,
			}
		) => {
			try {
				let isDuplicated = !!(await prisma.community.findFirst({
					where: {
						name
					},
				}))

				if (isDuplicated) throw new Error("Community already exists");

				const avatarUpload = await imagekit.upload({
					file: avatar,
					fileName: name,
					folder: `/community/avatar`,
				});

				const bannerUpload = await imagekit.upload({
					file: banner,
					fileName: name,
					folder: `/community/banner`,
				});


				const community = await prisma.community.create({
					data: {
						name,
						description,
						avatar: avatarUpload.filePath,
						banner: bannerUpload.filePath,
						creatorId,
					},
				});
				console.log(community)
				return {
					code: 200,
					success: true,
					message: "Community created successfully",
					community,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Community creation failed",
					community: null,
				};
			}
		},
	},
};
