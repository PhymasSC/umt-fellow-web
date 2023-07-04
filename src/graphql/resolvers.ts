
import { GraphQLDateTime } from "graphql-iso-date";
import bcrypt from "bcrypt";
import ImageKit from "imagekit";
import { PrismaClient, Prisma, Role } from "@prisma/client";
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

type PrismaType = PrismaClient<
	Prisma.PrismaClientOptions,
	never,
	Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;
export const resolvers = {
	DateTime: GraphQLDateTime,

	Query: {
		getUser: async (_: any, { id, email }: { id: string, email: string }, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id,
					email
				},
			});
			return user;
		},
		getUsers: async (
			_: any,
			{ limit, offset }: { limit: number; offset: number },
			{ prisma }: { prisma: PrismaType }
		) => {
			const users = await prisma.user.findMany({
				take: limit,
				skip: offset,
			});
			return users;
		},
		getUsersByName: async (
			_: any,
			{ name, limit, offset }: { name: string, limit: number; offset: number }
			, { prisma }: { prisma: PrismaType }
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

		getThreads: async (_: any, __: any, { prisma }: { prisma: PrismaType }) => {
			const threads = await prisma.threads.findMany({
				orderBy: {
					updated_at: "desc",
				},
			});
			return threads;
		},
		getThreadsByAuthor: async (
			_: any,
			{ authorId }: { authorId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const threads = await prisma.threads.findMany({
				where: {
					authorId: authorId,
				},
			});
			return threads;
		},
		getThreadById: async (_: any, { id }: { id: string }, { prisma }: { prisma: PrismaType }) => {
			const thread = await prisma.threads.findFirst({
				where: {
					id,
				},
			});
			return thread;
		},
		getThreadsByCommunity: async (
			_: any,
			{ communityId }: { communityId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const threads = await prisma.threads.findMany({
				where: { communityId }
			});
			return threads;
		},
		getThreadVotes: async (_: any, { threadId }: { threadId: string }, { prisma }: { prisma: PrismaType }) => {
			const votes = await prisma.thread_votes.findMany({
				where: {
					thread_id: threadId,
				},
			});
			return votes;
		},
		getThreadUpvotesAndDownvotes: async (
			_: any,
			{ threadId }: { threadId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const upvotes = await prisma.thread_votes.count({
				where: {
					thread_id: threadId,
					vote: VoteType.UPVOTE,
				},
			});

			const downvotes = await prisma.thread_votes.count({
				where: {
					thread_id: threadId,
					vote: VoteType.DOWNVOTE,
				},
			});

			return [upvotes, downvotes];
		},
		getThreadsVotedByUser: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const threads = await prisma.threads.findMany({
				where: {
					threadvotes: {
						some: {
							user_id: userId,
						},
					}
				}
			});
			return threads;
		},

		getCommunities: async (_: any, { userId }: { userId?: string }, { prisma }: { prisma: PrismaType }) => {
			const communities = await prisma.community.findMany();
			if (!userId) return communities;

			const communitiesWithJoinStatus = await Promise.all(
				communities.map(async (community) => {
					const communityMember = await prisma.communityMember.findFirst({
						where: {
							communityId: community.id,
							userId,
						},
					});
					return {
						...community,
						isJoined: !!communityMember,
					};
				})
			);
			return communitiesWithJoinStatus
		},
		getCommunityById: async (_: any, { id }: { id: string }, { prisma }: { prisma: PrismaType }) => {
			const community = await prisma.community.findFirst({
				where: {
					id,
				},
			});
			return community;
		},
		getCommunitiesOwnedByUser: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			// get community where user is admin in community member entity
			const communities = await prisma.community.findMany({
				where: {
					CommunityMember: {
						some: {
							userId,
							role: Role.ADMIN
						}
					}
				}
			});
			console.log(communities)
			return communities;
		},
		getCommunitiesFollowedByUser: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const communities = await prisma.community.findMany({
				where: {
					CommunityMember: {
						some: {
							userId
						}
					}
				}
			});

			const communitiesWithJoinStatus = await Promise.all(
				communities.map(async (community) => {
					const communityMember = await prisma.communityMember.findFirst({
						where: {
							communityId: community.id,
							userId,
						},
					});
					return {
						...community,
						isJoined: !!communityMember,
					};
				})
			);
			console.log(communities)
			return communitiesWithJoinStatus;
		},

		getCommunityMembers: async (
			_: any,
			{ communityId, role, limit, offset }: { communityId: string, role?: [Role], limit: number, offset: number },
			{ prisma }: { prisma: PrismaType }
		) => {
			const members = await prisma.communityMember.findMany({
				where: {
					communityId,
					role: {
						in: role || [Role.ADMIN, Role.MODERATOR, Role.USER]
					}
				},
				take: limit,
				skip: offset,
			});
			console.log(members)
			return members;
		},

		getCommunityMembersByName: async (
			_: any,
			{ communityId, name, role, limit, offset }: { communityId: string, name: string, role: Role, limit: number, offset: number },
			{ prisma }: { prisma: PrismaType }
		) => {
			const members = await prisma.communityMember.findMany({
				where: {
					communityId,
					user: {
						name: {
							contains: name,
						}
					},
					role: {
						in: role || [Role.ADMIN, Role.MODERATOR, Role.USER]
					}
				},
				take: limit,
				skip: offset,
			});
			console.log(members)
			return members;
		},

		getCommunityModerators: async (
			_: any,
			{ communityId }: { communityId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const moderators = await prisma.communityMember.findMany({
				where: {
					communityId,
					role: Role.MODERATOR
				}
			});
			return moderators;
		},

		getCommunityMember: async (
			_: any,
			{ communityId, userId }: { communityId: string, userId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const member = await prisma.communityMember.findFirst({
				where: {
					communityId,
					userId
				},
			});
			return member;
		},

		getCommunityRules: async (
			_: any,
			{ communityId }: { communityId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const rules = await prisma.communityRules.findMany({
				where: {
					communityId
				},
				orderBy: {
					rule: 'asc',
				}
			});
			return rules;
		},

		getChannels: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const channels = await prisma.channel.findMany({
				where: {
					ChannelParticipants: {
						some: {
							userId
						}
					},
					Message: {
						some: {}
					}
				},
			});
			return channels;
		},

		getChannelParticipants: async (
			_: any,
			{ channelId, limit, offset }: { channelId: string, limit: number, offset: number },
			{ prisma }: { prisma: PrismaType }
		) => {
			const participants = await prisma.channelParticipants.findMany({
				where: {
					channelId
				},
				take: limit,
				skip: offset,
			});
			return participants;
		},

		getMessages: async (_: any, { channelId }: { channelId: string }, { prisma }: { prisma: PrismaType }) => {
			const messages = await prisma.message.findMany({
				where: {
					channelId
				},
				orderBy: {
					created_at: "desc"
				}
			});
			return messages;
		},

		getComments: async (_: any, { threadId }: { threadId: string }, { prisma }: { prisma: PrismaType }) => {
			const comments = await prisma.comment.findMany({
				where: {
					threadId,
					parentId: ""
				},
				orderBy: {
					created_at: "desc"
				}
			});
			return comments;
		},

		getCommentsByParentId: async (
			_: any,
			{ parentId }: { parentId: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			const comments = await prisma.comment.findMany({
				where: {
					parentId
				},
				orderBy: {
					created_at: "desc"
				}
			});
			return comments;
		},

		getCommentsByUserId: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const comments = await prisma.comment.findMany({
				where: {
					userId
				},
				orderBy: [
					{ threadId: "desc" },
					{ created_at: "desc" }
				]
			});
			return comments;
		},

		getCommentsVotedByUser: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const comments = await prisma.comment.findMany({
				where: {
					commentvotes: {
						some: {
							user_id: userId
						}
					}
				},
				orderBy: [
					{ threadId: "desc" },
					{ created_at: "desc" }
				]
			});
			return comments;
		},

		getFollowers: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const followers = await prisma.follow.findMany({
				where: {
					followingId: userId
				},
			});
			return followers;
		},

		getFollowings: async (_: any, { userId }: { userId: string }, { prisma }: { prisma: PrismaType }) => {
			const followings = await prisma.follow.findMany({
				where: {
					followerId: userId
				},
			});
			return followings;
		},

		getFollow: async (_: any, { followerId, followingId }: { followerId: string, followingId: string }, { prisma }: { prisma: PrismaType }) => {
			const follow = await prisma.follow.findFirst({
				where: {
					followerId,
					followingId
				},
			});
			return follow;
		},

		getCommentUpvotesAndDownvotes: async (_: any, { commentId }: { commentId: string }, { prisma }: { prisma: PrismaType }) => {
			// get comment upvotes and downvotes count
			const commentUpvotes = await prisma.commentVotes.count({
				where: {
					comment_id: commentId,
					vote: "UPVOTE"
				}
			});

			const commentDownvotes = await prisma.commentVotes.count({
				where: {
					comment_id: commentId,
					vote: "DOWNVOTE"
				}
			});

			console.log(commentUpvotes, commentDownvotes)

			return commentUpvotes - commentDownvotes;
		}
	},

	Vote: {
		thread: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const thread = await prisma.threads.findFirst({
				where: {
					id: parent.thread_id,
				},
			});
			return thread;
		},

		user: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.user_id,
				},
			});
			return user;
		},

		comment: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const comment = await prisma.comment.findFirst({
				where: {
					id: parent.comment_id,
				},
			});
			return comment;
		}
	},

	Thread: {
		author: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.authorId,
				},
			});
			return user;
		},
		images: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
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
		creatorId: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.creatorId,
				},
			});
			return user;
		},
		threads: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const threads = await prisma.threads.findMany({
				where: {
					communityId: parent.id,
				},
			});
			return threads;
		},
		rules: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const rules = await prisma.communityRules.findMany({
				where: {
					communityId: parent.id,
				},
				orderBy: {
					rule: "asc"
				}
			});
			return rules;
		},
		admin: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const adminId = (await prisma.community.findFirst({
				where: {
					id: parent.id
				},
				include: {
					CommunityMember: {
						where: {
							role: Role.ADMIN
						}
					}
				}
			}))?.CommunityMember?.[0]?.userId || ""

			const admin = await prisma.user.findFirst({
				where: {
					id: adminId,
				},
			});
			return admin;
		},
		moderators: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const moderatorsId = (await prisma.community.findFirst({
				where: {
					id: parent.id
				},
				include: {
					CommunityMember: {
						where: {
							role: Role.MODERATOR
						}
					}
				}
			}))?.CommunityMember?.map((member: any) => member.userId) || []

			const moderators = await prisma.user.findMany({
				where: {
					id: {
						in: moderatorsId
					}
				}
			})

			return moderators;
		},
		members: async (parent: any, { limit }: { limit?: number }, { prisma }: { prisma: PrismaType }) => {

			const membersId = (await prisma.community.findFirst({
				where: {
					id: parent.id
				},
				include: {
					CommunityMember: {
						where: {
							role: Role.USER
						}
					}
				},
				take: limit
			}))?.CommunityMember?.map((member: any) => member.userId) || []

			const members = await prisma.user.findMany({
				where: {
					id: {
						in: membersId
					}
				}
			})

			return members;
		}
	},

	CommunityMember: {
		userId: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.userId,
				},
			});
			return user;
		},
		communityId: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const community = await prisma.community.findFirst({
				where: {
					id: parent.communityId,
				},
			});
			return community;
		},
	},

	Channel: {
		participants: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const participants = await prisma.channelParticipants.findMany({
				where: {
					channelId: parent.id,
				},
			});
			return participants;
		},

		messages: async (parent: any, { limit }: { limit?: number }, { prisma }: { prisma: PrismaType }) => {
			const queryOption: any = {
				where: {
					channelId: parent.id,
				},
				orderBy: {
					created_at: "desc"
				}
			}
			if (limit) queryOption.take = limit
			const messages = await prisma.message.findMany(queryOption);
			console.log(messages);
			return messages;
		},

	},

	ChannelParticipant: {
		user: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const user = await prisma.user.findFirst({
				where: {
					id: parent.userId,
				},
			});
			return user;
		},

		channel: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const channel = await prisma.channel.findFirst({
				where: {
					id: parent.channelId,
				},
			});
			return channel;
		}
	},

	Message: {
		user: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			console.log(parent)
			const user = await prisma.user.findFirst({
				where: {
					id: parent.senderId,
				},
			});
			return user;
		},

		channel: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const channel = await prisma.channel.findFirst({
				where: {
					id: parent.channelId,
				},
			});
			return channel;
		}
	},

	Comment: {
		user: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			console.log(parent.userId)
			if (parent.userId === "") return null
			const user = await prisma.user.findFirst({
				where: {
					id: parent.userId,
				},
			});
			return user;
		},
		thread: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const thread = await prisma.threads.findFirst({
				where: {
					id: parent.threadId,
				},
			});
			return thread;
		},
		replies: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const children = await prisma.comment.findMany({
				where: {
					parentId: parent.id,
				},
				orderBy: {
					created_at: "desc"
				}
			});
			return children;
		}
	},

	CommunityRules: {
		community: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const community = await prisma.community.findFirst({
				where: {
					id: parent.community,
				},
			});
			return community;
		}
	},

	Follow: {
		follower: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const follower = await prisma.user.findFirst({
				where: {
					id: parent.followerId,
				},
			});
			return follower;
		},
		following: async (parent: any, _: any, { prisma }: { prisma: PrismaType }) => {
			const following = await prisma.user.findFirst({
				where: {
					id: parent.followingId,
				},
			});
			return following;
		}
	},

	Mutation: {
		addUser: async (
			_: any,
			{
				name,
				email,
				password,
			}: { name: string; email: string; password: string },
			{ prisma }: { prisma: PrismaType }
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

		updateUser: async (
			_: any,
			attr: {
				id: string;
				name: string;
				email: string;
				password: string;
				image: { name: string; blob: string; isExisting: boolean; isDeleted: boolean };
				coverImage: { name: string; blob: string; isExisting: boolean; isDeleted: boolean };
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
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			// const hashedPassword = await bcrypt.hash(password, saltRounds);
			const { id, image, coverImage, ...rest } = attr
			if (image?.blob || coverImage?.blob) {

				const upload = await imagekit.upload({
					file: image?.blob || coverImage?.blob,
					fileName: image?.name || coverImage?.name,
					folder: `/profile/${image?.blob ? "image" : "coverImage"}/`,
					useUniqueFileName: true,
				});

				const user = prisma.user.update({
					where: {
						id,
					},
					data: {
						updated_at: new Date().toISOString(),
						[image?.blob ? "image" : "coverImage"]: `https://ik.imagekit.io/umtfellow/tr:h-600/${upload.filePath}`,
					},
				});

				return {
					code: 200,
					success: true,
					message: "Profile updated successfully",
					user
				}
			}
			if (rest.password) rest.password = await bcrypt.hash(rest.password, saltRounds)
			try {
				const user = await prisma.user.update({
					where: {
						id,
					},
					data: {
						updated_at: new Date().toISOString(),
						...rest,
					},
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
				communityId
			}: {
				title: string;
				description: string;
				images: { name: string; blob: string; isExisting: boolean; isDeleted: boolean }[];
				tags: string[];
				author: string;
				communityId: string;
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

				const thread = await prisma.threads.create({
					data: {
						title,
						//@ts-ignore
						description,
						authorId: author,
						communityId: uuidRegex.test(communityId) ? communityId : null,
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
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const thread = await prisma.threads.update({
					where: {
						id,
					},
					data: {
						title,
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
							const res = await imagekit.getFileDetails(image.id || "")
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

		deleteThread: async (_: any, { id }: { id: string }, { prisma }: { prisma: PrismaType }) => {
			try {
				const images = await prisma.images.deleteMany({
					where: {
						threadId: id,
					},
				});
				if (images.count > 0)
					await imagekit.deleteFolder(`/threads/${id}`);
				const thread = await prisma.threads.delete({
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
			}: { threadId: string; userId: string; voteType: VoteType },
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const vote = await prisma.thread_votes.upsert({
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
				const data = await prisma.thread_votes.groupBy({
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
			},
			{ prisma }: { prisma: PrismaType }
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

				await prisma.communityMember.create({
					data: {
						communityId: community.id,
						userId: creatorId,
						role: Role.ADMIN,
					},
				});

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

		updateCommunity: async (
			_: any,
			attr: {
				id: string,
				name: string,
				description: string,
				avatar: { name: string; blob: string; isExisting: boolean; isDeleted: boolean },
				banner: { name: string; blob: string; isExisting: boolean; isDeleted: boolean },
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			const { id, avatar, banner, ...rest } = attr
			if (avatar?.blob || banner?.blob) {

				const upload = await imagekit.upload({
					file: avatar?.blob || banner?.blob,
					fileName: avatar?.name || banner?.name,
					folder: `/community/${avatar?.blob ? "avatar" : "banner"}/`,
					useUniqueFileName: true,
				});

				const community = prisma.community.update({
					where: {
						id,
					},
					data: {
						updated_at: new Date().toISOString(),
						[avatar?.blob ? "avatar" : "banner"]: upload.filePath,
					},
				});

				return {
					code: 200,
					success: true,
					message: "Community updated successfully",
					community
				}
			}
			try {
				const community = await prisma.community.update({
					where: {
						id,
					},
					data: {
						updated_at: new Date().toISOString(),
						...rest
					},
				});
				return {
					code: 200,
					success: true,
					message: "Community updated successfully",
					community,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Community update failed",
					community: null,
				};
			}
		},

		deleteCommunity: async (
			_: any,
			{ id }: { id: string },
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const community = await prisma.community.delete({
					where: {
						id,
					},
				});
				return {
					code: 200,
					success: true,
					message: "Community deleted successfully",
					community: community,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Community deletion failed",
					community: null,
				};
			}
		},

		addModerator: async (
			_: any,
			{ communityId, userId, }: { communityId: string, userId: string, },
			{ prisma }: { prisma: PrismaType }
		) => {
			try {

				const member = await prisma.communityMember.update({
					where: {
						communityId_userId: {
							communityId,
							userId,
						},
					},
					data: {
						role: Role.MODERATOR,
					},
				});

				return member
			} catch (error: any) {
				return null;
			}
		},

		removeModerator: async (
			_: any,
			{ communityId, userId, }: { communityId: string, userId: string, },
			{ prisma }: { prisma: PrismaType }
		) => {
			try {

				const member = await prisma.communityMember.update({
					where: {
						communityId_userId: {
							communityId,
							userId,
						},
					},
					data: {
						role: Role.USER,
					},
				});

				return member
			} catch (error: any) {
				return null;
			}
		},

		joinCommunity: async (
			_: any,
			{
				communityId,
				userId,
				role
			}: {
				communityId: string,
				userId: string,
				role?: Role
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const community = await prisma.community.findFirst({
					where: {
						id: communityId,
					},
				});

				const member = await prisma.communityMember.create({
					data: {
						communityId,
						userId,
						role: role || Role.USER,
					},
				});

				return { ...community, isJoined: true }
			} catch (error: any) {
				return null;
			}
		},

		leaveCommunity: async (
			_: any,
			{
				communityId,
				userId,
			}: {
				communityId: string,
				userId: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const community = await prisma.community.findFirst({
					where: {
						CommunityMember: {
							some: {
								communityId,
								userId,
							},
						}
					}
				})

				const role = await prisma.communityMember.findFirst({
					where: {
						communityId,
						userId,
					},
				})

				if (!role || role.role === Role.ADMIN) return null

				const member = await prisma.communityMember.delete({
					where: {
						communityId_userId: {
							communityId,
							userId,
						},

					},
				});

				return { ...community, isJoined: false }
			} catch (error: any) {
				return null
			}
		},

		addCommunityRule: async (
			_: any,
			{
				communityId,
				rule,
			}: {
				communityId: string,
				rule: {
					rule: string,
					description: string,
				},
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const communityRulesCount = await prisma.communityRules.count({
					where: {
						communityId,
					},
				});

				if (communityRulesCount >= 10) throw new Error("Maximum 10 rules allowed")

				const communityRule = await prisma.communityRules.create({
					data: ({
						communityId,
						rule: rule.rule,
						description: rule.description,
					}),
				});
				return {
					code: 200,
					success: true,
					message: "Rules added successfully",
					communityRules: communityRule
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Rules addition failed",
					communityRules: null,
				};
			}
		},

		updateCommunityRule: async (
			_: any,
			{
				ruleId,
				rule,
			}: {
				ruleId: string,
				rule: {
					rule: string,
					description: string,
				},
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const communityRule = await prisma.communityRules.update({
					where: {
						id: ruleId,
					},
					data: ({
						rule: rule.rule,
						description: rule.description,
					}),
				});
				return {
					code: 200,
					success: true,
					message: "Rule updated successfully",
					communityRules: communityRule
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Rule update failed",
					communityRules: null,
				};
			}
		},

		deleteCommunityRule: async (
			_: any,
			{
				ruleId,
			}: {
				ruleId: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {

			try {
				const communityRule = await prisma.communityRules.delete({
					where: {
						id: ruleId,
					},
				});
				return {
					code: 200,
					success: true,
					message: "Rule deleted successfully",
					communityRules: communityRule
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Rule deletion failed",
					communityRules: null,
				};
			}
		},


		addComment: async (
			_: any,
			{
				threadId,
				userId,
				content,
				parentId,
			}: {
				threadId: string,
				userId: string,
				content: string,
				parentId?: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const comment = await prisma.comment.create({
					data: {
						threadId,
						userId,
						content,
						parentId: parentId || ""
					},
				});

				return comment
			} catch (error: any) {
				return null
			}
		},
		updateComment: async (
			_: any,
			{
				commentId,
				content,
			}: {
				commentId: string,
				content: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const comment = await prisma.comment.update({
					where: {
						id: commentId,
					},
					data: {
						content,
						updated_at: new Date(),
					},
				});

				return comment
			} catch (error: any) {
				return null
			}
		},

		deleteComment: async (
			_: any,
			{
				commentId,
			}: {
				commentId: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				// Check if the comment has any children
				const comment = await prisma.comment.findFirst({
					where: {
						parentId: commentId,
					},
				});

				// If the comment has children, update the comment
				// else delete the comment
				if (comment) {
					return await prisma.comment.update({
						where: {
							id: commentId,
						},
						data: {
							userId: "",
							content: "The comment has been deleted",
							updated_at: new Date(),
						},
					});
				}

				return await prisma.comment.delete({ where: { id: commentId, } });


			} catch (error: any) {
				return null
			}
		},

		followUser: async (
			_: any,
			{
				followerId,
				followingId,
			}: {
				followerId: string,
				followingId: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				console.log(followerId, followingId)
				const follow = await prisma.follow.create({
					data: {
						followerId,
						followingId
					},
				});

				return {
					code: 200,
					success: true,
					message: "Followed successfully",
					follow,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Follow failed",
					follow: null,
				};
			}
		},

		unfollowUser: async (
			_: any,
			{
				followerId,
				followingId,
			}: {
				followerId: string,
				followingId: string,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				const follow = await prisma.follow.delete({
					where: {
						followerId_followingId: {
							followerId,
							followingId
						}
					}
				});

				return {
					code: 200,
					success: true,
					message: "Unfollowed successfully",
					follow,
				};
			} catch (error: any) {
				return {
					code: 1,
					success: false,
					message: error.message || "Unfollow failed",
					follow: null,
				};
			}
		},

		voteComment: async (
			_: any,
			{
				commentId,
				userId,
				vote,
			}: {
				commentId: string,
				userId: string,
				vote: VoteType,
			},
			{ prisma }: { prisma: PrismaType }
		) => {
			try {
				// get previous vote
				const previousVote = await prisma.commentVotes.findFirst({
					where: {
						user_id: userId,
						comment_id: commentId
					}
				});


				// remove vote if vote type is same as previous vote
				if (previousVote && previousVote.vote === vote) {
					await prisma.commentVotes.delete({
						where: {
							user_id_comment_id: {
								comment_id: commentId,
								user_id: userId
							}
						}
					});

					const data = await prisma.commentVotes.groupBy({
						by: ["vote"],
						where: {
							comment_id: commentId
						},
						_count: {
							_all: true,
						},
					});
					return {
						code: 200,
						success: true,
						message: "Comment vote removed successfully",
						commentVote: null,
						upvotes:
							data[0]?.vote === "UPVOTE"
								? data[0]?._count._all
								: data[1]?._count._all || 0,
						downvotes:
							data[0]?.vote === "DOWNVOTE"
								? data[0]?._count._all
								: data[1]?._count._all || 0,
					};
				}

				const commentVote = await prisma.commentVotes.upsert({
					where: {
						user_id_comment_id: {
							comment_id: commentId,
							user_id: userId
						}
					},
					update: {
						vote
					},
					create: {
						comment_id: commentId,
						user_id: userId,
						vote
					}
				});

				const data = await prisma.commentVotes.groupBy({
					by: ["vote"],
					where: {
						comment_id: commentId
					},
					_count: {
						_all: true,
					},
				});

				return {
					code: 200,
					success: true,
					message: "Comment voted successfully",
					vote: commentVote,
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
				return {
					code: 1,
					success: false,
					message: error.message || "Comment vote failed",
					commentVote: null,
				};
			}
		},
	},
};
