import { gql } from "apollo-server-micro";

export const typeDefs = gql`
	scalar DateTime

	type User {
		id: String!
		username: String!
		email: String!
		password: String!
		isUMTMember: Boolean
		role: Role
		sex: Sex
		age: Int
		about: String
		image: String
		faculty: String
		major: String
		cgpa: Float
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
		user: [User]!
	}

	type Mutation {
		addUser(name: String!, email: String!, password: String!): User!
		getUser(name: String!, password: String!): User!
	}
`;
