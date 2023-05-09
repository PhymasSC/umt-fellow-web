import { gql } from "apollo-server-micro";

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
		year: String
		cgpa: Float
		failedAttempts: Int
		nextAvailableLogin: DateTime
		threads: [Thread]
		created_at: DateTime
		updated_at: DateTime
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

	}

	type Thread {
		id: String!
		title: String!
		description: String!
		images: [String]
		tags: [String]
		author: User
		flag: Flag
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
	}

	input Image {
		name: String!
		blob: String!
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
`;
