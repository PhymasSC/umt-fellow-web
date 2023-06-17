import { gql } from "graphql-tag"

export const typeDefs = gql`
	scalar DateTime

	type User {
		id: String!
		name: String!
		email: String!
		emailVerified: DateTime
		password: String
		isUMTMembership: Boolean
		sex: Sex
		age: Int
		image: String
		coverImage: String
		facebookLink: String
		twitterLink: String
		instagramLink: String
		githubLink: String
		dribbbleLink: String
		youtubeLink: String
		telegramLink: String
		tiktokLink: String
		redditLink: String
		snapchatLink: String
		about: String
		faculty: String
		major: String
		year: Float
		cgpa: Float
		failedAttempts: Int
		nextAvailableLogin: DateTime
		threads: [Thread]
		created_at: DateTime
		updated_at: DateTime
	}
	
	type ThreadImages {
		id: String!
		imageUrl: String!
		threadId: String!
		created_at: DateTime
		updated_at: DateTime
	}

	type Community {
		id: String!
		name: String!
		description: String!
		avatar: String!
		banner: String!
		creatorId: User!
		isJoined: Boolean
		created_at: DateTime
		updated_at: DateTime
	}

	type CommunityMember {
		communityId: Community!
		userId: User!
		role: Role!
		created_at: DateTime
		updated_at: DateTime
	}

	type Thread {
		id: String!
		title: String!
		description: String!
		images: [ThreadImages]
		tags: [String]
		author: User
		flag: Flag
		created_at: DateTime
		updated_at: DateTime
	}

	type Channel {
		id: String!
		name: String!
		participants: [ChannelParticipant]
		messages(limit: Int): [Message]
	}

	type ChannelParticipant {
		channel: Channel!
		user: User!
		created_at: DateTime
		updated_at: DateTime
	}

	type Message {
		id: String!
		channel: Channel!
		user: User!
		content: String!
		created_at: DateTime
		updated_at: DateTime
	}

	type Vote {
		thread: Thread!
		user: User!
		vote: VoteType
		created_at: DateTime
		updated_at: DateTime
	}

	enum VoteType {
		UPVOTE
		DOWNVOTE
	}

	enum Role {
		ADMIN
		MODERATOR
		USER
	}

	enum Sex {
		MALE
		FEMALE
	}

	enum Flag {
		PUBLIC
		PRIVATE
		REPORTED
	}

	type Query {
		getUser(id: String!): User!
		getUsers(limit: Int, offset: Int): [User]!
		getUsersByName(name: String!, limit: Int, offset: Int): [User]!
		
		getThreads: [Thread]
		getThreadsByAuthor(authorId: String!): [Thread]
		getThreadById(id: String!): Thread
		getThreadVotes(threadId: String!): [Vote]
		getThreadUpvotesAndDownvotes(threadId: String!): [Int]!

		getCommunities(userId: String): [Community]
		getCommunityById(id: String!): Community
		getCommunitiesOwnedByUser(userId: String!): [Community]

		getCommunityMembers(communityId: String!): [CommunityMember]!
		getCommunityMember(communityId: String!, userId: String!): CommunityMember!

		getChannels(userId: String): [Channel]
		getChannelParticipants(channelId: String!): [ChannelParticipant]
		getMessages(channelId: String!): [Message]
	}

	type Mutation {
		login(email: String!, password: String!): User!
		addUser(name: String!, email: String!, password: String!): UserResponse!
		addThread(
			title: String!
			description: String!
			images: [Image]
			tags: [String]
			author: String!
		): ThreadResponse!
		updateThread(
			id: String!
			title: String!
			description: String!
			images: [Image]
			tags: [String]
		): ThreadResponse!
		deleteThread(id: String!): ThreadResponse!
		voteThread(
			threadId: String!
			userId: String!
			voteType: VoteType!
		): VoteResponse!
		updateUser(
			id: String!
			name: String
			email: String
			password: String
			isUMTMembership: Boolean
			sex: Sex
			age: Int
			image: Image
			coverImage: Image
			facebookLink: String
			twitterLink: String
			instagramLink: String
			githubLink: String
			dribbbleLink: String
			youtubeLink: String
			telegramLink: String
			tiktokLink: String
			redditLink: String
			snapchatLink: String
			about: String
			faculty: String
			major: String
			year: Float
			cgpa: Float
		): UserResponse!

		addCommunity(
			name: String!
			description: String!
			avatar: String!
			banner: String!
			creatorId: String!
		) : CommunityResponse!
		updateCommunity(
			id: String!
			name: String
			description: String
			avatar: Image
			banner: Image
		) : CommunityResponse!
		
		addCommunityMember(
			communityId: String!
			userId: String!
		) : CommunityMemberResponse!
		deleteCommunityMember(
			communityId: String!
			userId: String!
		) : CommunityMemberResponse!
	}

	input Image {
		id: String
		name: String
		blob: String
		url: String
		isExisting: Boolean!
		isDeleted: Boolean!
	}

	type UserResponse {
		code: Int!
		success: Boolean!
		message: String!
		user: User
	}

	type ThreadResponse {
		code: Int!
		success: Boolean!
		message: String!
		thread: Thread
	}

	type VoteResponse {
		code: Int!
		success: Boolean!
		message: String!
		vote: Vote
		upvotes: Int!
		downvotes: Int!
	}

	type CommunityResponse {
		code: Int!
		success: Boolean!
		message: String!
		community: Community
	}

	type CommunityMemberResponse {
		code: Int!
		success: Boolean!
		message: String!
		communityMember: CommunityMember
	}
`;
