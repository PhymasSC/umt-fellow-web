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
		createdAt: DateTime
		updatedAt: DateTime
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
		getUsers: [User]!
		threads: [Thread]
		thread(id: String!): Thread
	}

	type Thread {
		id: String!
		title: String!
		description: String!
		images: [String]
		tags: [String]
		author: User
		flag: Flag
		createdAt: DateTime
		updatedAt: DateTime
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
`;
