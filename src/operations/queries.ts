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
			createdAt
			updatedAt
		}
	}
`;

export const GET_THREADS = gql`
	{
		threads {
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
			createdAt
			updatedAt
		}
	}
`;

export const GET_THREAD = gql`
	query Thread($id: String!) {
		thread(id: $id) {
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
			createdAt
			updatedAt
		}
	}
`;
