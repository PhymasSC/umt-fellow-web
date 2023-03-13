import { gql } from "@apollo/client";

export const GET_USERS = gql`
	{
		getUsers {
			id
			name
			email
			password
		}
	}
`;

export const GET_USER = gql`
	query getUser($id: String!) {
		getUser(id: $id) {
			id
			name
			email
			emailVerified
			password
			isUMTMembership
			sex
			age
			image
			facebookLink
			twitterLink
			instagramLink
			githubLink
			dribbbleLink
			youtubeLink
			telegramLink
			tiktokLink
			redditLink
			snapchatLink
			about
			faculty
			major
			year
			cgpa
			created_at
			updated_at
		}
	}
`;

export const GET_THREADS = gql`
	{
		getThreads {
			id
			title
			description
			images
			tags
			author {
				id
				name
				image
			}
			flag
			created_at
			updated_at
		}
	}
`;

export const GET_THREAD = gql`
	query GetThreadById($id: String!) {
		getThreadById(id: $id) {
			id
			title
			description
			images
			tags
			author {
				id
				image
				name
			}
			flag
			created_at
			updated_at
		}
	}
`;

export const GET_THREADS_BY_AUTHOR = gql`
	query GetThreadsByAuthor($authorId: String!) {
		getThreadsByAuthor(authorId: $authorId) {
			id
			title
			description
			images
			tags
			author {
				id
				image
				name
			}
			flag
			created_at
			updated_at
		}
	}
`;

export const GET_THREAD_VOTES = gql`
	query GetThreadVotes($threadId: String!) {
		getThreadVotes(threadId: $threadId) {
			updated_at
			user {
				id
				image
				name
			}
			thread {
				id
			}
		}
	}
`;

export const GET_THREAD_UPVOTES_AND_DOWNVOTES = gql`
	query GetThreadUpvotesAndDownvotes($threadId: String!) {
		getThreadUpvotesAndDownvotes(threadId: $threadId)
	}
`;
