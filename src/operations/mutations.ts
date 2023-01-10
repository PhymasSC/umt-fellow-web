import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation AddUser($name: String!, $email: String!, $password: String!) {
		addUser(name: $name, email: $email, password: $password) {
			code
			success
			message
			user {
				id
				name
				email
				emailVerified
				password
				image
			}
		}
	}
`;

export const ADD_THREAD = gql`
	mutation AddThread(
		$title: String!
		$description: String!
		$author: String!
		$images: [Image]
	) {
		addThread(
			title: $title
			description: $description
			images: $images
			author: $author
		) {
			code
			success
			message
			thread {
				id
				description
			}
		}
	}
`;
