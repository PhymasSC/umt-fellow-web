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
	query getUser($email: String!, $password: String!) {
		getUser(email: $email, password: $password) {
			id
			name
			email
			password
		}
	}
`;
