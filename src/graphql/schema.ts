import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	scalar DateTime

	type User {
		id: String!
		name: String!
		email: String!
		emailVerified: DateTime
		password: String
		isUMTMember: Boolean
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
		lastLogin: DateTime
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

	type Query {
		getUser(email: String!, password: String): User!
		getUsers: [User]!
	}

	type Mutation {
		login(email: String!, password: String!): User!
		addUser(name: String!, email: String!, password: String!): User!
	}
`;
