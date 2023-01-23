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

export const UPDATE_THREAD = gql`
	mutation UpdateThread(
		$id: String!
		$title: String!
		$description: String!
		$images: [Image]
	) {
		updateThread(
			id: $id
			title: $title
			description: $description
			images: $images
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

export const DELETE_THREAD = gql`
	mutation DeleteThread($id: String!) {
		deleteThread(id: $id) {
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
