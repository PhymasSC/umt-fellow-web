import { gql } from "@apollo/client";

const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		name
		image
		email
	}
`;

const THREAD_FRAGMENT = gql`
	${USER_FRAGMENT}
	fragment ThreadFragment on Thread {
		id
		title
		description
		images{
			id
			imageUrl
		}
		tags
		author {
			...UserFragment
		}
		flag
		created_at
		updated_at
	}
`;

export const GET_USERS = gql`
	${USER_FRAGMENT}
	{
		getUsers {
			...UserFragment
		}
	}
`;

export const GET_USERS_LIMIT_OFFSET = gql`
	${USER_FRAGMENT}
	query GetUsers($limit: Int, $offset: Int) {
		getUsers(limit: $limit, offset: $offset) {
			...UserFragment
		}
	}
`;

export const GET_USER = (fields: any) => gql`
	${USER_FRAGMENT}

	query getUser($id: String!) {
		getUser(id: $id) {
			...UserFragment
			${fields}
		}
	}
`;

export const GET_USERS_BY_NAME = (fields: any) => gql`
	${USER_FRAGMENT}
	query GetUsersByName($name: String!, $limit: Int, $offset: Int) {
		getUsersByName(name: $name, limit: $limit, offset: $offset) {
			...UserFragment
			${fields}
		}
	}
`;

export const GET_THREADS = gql`
	${THREAD_FRAGMENT}
	{
		getThreads {
			...ThreadFragment
		}
	}
`;

export const GET_THREAD = gql`
	${THREAD_FRAGMENT}
	query GetThreadById($id: String!) {
		getThreadById(id: $id) {
			...ThreadFragment
		}
	}
`;

export const GET_THREADS_BY_AUTHOR = gql`
	${THREAD_FRAGMENT}
	query GetThreadsByAuthor($authorId: String!) {
		getThreadsByAuthor(authorId: $authorId) {
			...ThreadFragment
		}
	}
`;

export const GET_THREAD_VOTES = gql`
	${USER_FRAGMENT}
	query GetThreadVotes($threadId: String!) {
		getThreadVotes(threadId: $threadId) {
			updated_at
			user {
				...UserFragment
			}
		}
	}
`;

export const GET_THREAD_UPVOTES_AND_DOWNVOTES = gql`
	query GetThreadUpvotesAndDownvotes($threadId: String!) {
		getThreadUpvotesAndDownvotes(threadId: $threadId)
	}
`;
