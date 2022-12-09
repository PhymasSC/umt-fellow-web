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
			isUMTMember
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
