import { gql } from "@apollo/client";

// User

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

export const EDIT_USER = (arg: {
	name?: boolean, password?: boolean, facebookLink?: boolean, twitterLink?: boolean, instagramLink?: boolean, githubLink?: boolean, dribbbleLink?: boolean, youtubeLink?: boolean, telegramLink?: boolean, tiktokLink?: boolean, redditLink?: boolean, snapchatLink?: boolean, about?: boolean, faculty?: boolean, major?: boolean, year?: boolean, cgpa?: boolean, failedAttempts?: boolean, nextAvailableLogin?: boolean
}) => gql`
mutation Mutation($id: String! 
	${(arg.name && ",$name: String ") || ""}
	${(arg.password && ",$password: String ") || ""}
	${(arg.facebookLink && ",$facebookLink: String ") || ""}
	${(arg.twitterLink && ",$twitterLink: String ") || ""}
	${(arg.instagramLink && ",$instagramLink: String ") || ""}
	${(arg.githubLink && ",$githubLink: String ") || ""}
	${(arg.dribbbleLink && ",$dribbbleLink: String ") || ""}
	${(arg.youtubeLink && ",$youtubeLink: String ") || ""}
	${(arg.telegramLink && ",$telegramLink: String ") || ""}
	${(arg.tiktokLink && ",$tiktokLink: String ") || ""}
	${(arg.redditLink && ",$redditLink: String ") || ""}
	${(arg.snapchatLink && ",$snapchatLink: String ") || ""}
	${(arg.about && ",$about: String ") || ""}
	${(arg.faculty && ",$faculty: String ") || ""}
	${(arg.major && ",$major: String ") || ""}
	${(arg.year && ",$year: Float ") || ""}
	${(arg.cgpa && ",$cgpa: Float ") || ""}
	) {
	updateUser(id: $id 
		${(arg.name && ",name: $name ") || ""}
		${(arg.password && ",password: $password ") || ""}
		${(arg?.facebookLink && ",facebookLink: $facebookLink ") || ""}
		${(arg?.twitterLink && ",twitterLink: $twitterLink ") || ""}
		${(arg?.instagramLink && ",instagramLink: $instagramLink ") || ""}
		${(arg?.githubLink && ",githubLink: $githubLink ") || ""}
		${(arg?.dribbbleLink && ",dribbbleLink: $dribbbleLink ") || ""}
		${(arg?.youtubeLink && ",youtubeLink: $youtubeLink ") || ""}
		${(arg?.telegramLink && ",telegramLink: $telegramLink ") || ""}
		${(arg?.tiktokLink && ",tiktokLink: $tiktokLink ") || ""}
		${(arg?.redditLink && ",redditLink: $redditLink ") || ""}
		${(arg?.snapchatLink && ",snapchatLink: $snapchatLink ") || ""}
		${(arg?.about && ",about: $about ") || ""}
		${(arg?.faculty && ",faculty: $faculty ") || ""}
		${(arg?.major && ",major: $major ") || ""}
		${(arg?.year && ",year: $year ") || ""}
		${(arg?.cgpa && ",cgpa: $cgpa ") || ""}
		) {
	  code
	  message
	  success
	  user {
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
  }
`;

// Thread 

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

export const VOTE_THREAD = gql`
	mutation VoteThread(
		$threadId: String!
		$userId: String!
		$type: VoteType!
	) {
		voteThread(threadId: $threadId, userId: $userId, voteType: $type) {
			code
			message
			success
			upvotes
			downvotes
			vote {
				updated_at
				created_at
				vote
				user {
					id
				}
				thread {
					id
				}
			}
		}
	}
`;

// Community

export const ADD_COMMUNITY = gql`
mutation AddCommunity($name: String!, $description: String!, $avatar: String!, $banner: String!, $creatorId: String!) {
	addCommunity(name: $name, description: $description, avatar: $avatar, banner: $banner, creatorId: $creatorId) {
	  code
	  message
	  community {
		id
		name
		description
		avatar
		banner
		created_at
		updated_at
		creatorId {
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
		  failedAttempts
		  nextAvailableLogin
		  created_at
		  updated_at
		  threads {
			id
		  }
		}
	  }
	  success
	}
  }
`;

export const UPDATE_COMMUNITY = (arg: {
	name?: boolean,
	description?: boolean,
	avatar?: boolean,
	banner?: boolean
}) => gql`
mutation UpdateCommunity($id: String! 
	${(arg.name && ", $name: String!" || "")} 
	${(arg.description && ", $description: String!" || '')} 
	${(arg.avatar && ", $avatar: String!" || "")} 
	${(arg.banner && ", $banner: String!" || "")} ) {
	updateCommunity(id: $id 
		${(arg.name && ", name: $name" || "")} 
		${(arg.description && ", description: $description" || "")} 
		${(arg.avatar && ", avatar: $avatar" || "")} 
		${(arg.banner && ", banner: $banner" || "")} ) {
		code
		message
		community {
			id
			name
			description
			avatar
			banner
			created_at
			updated_at
		}
	}
}
`;

// Community Members

export const ADD_COMMUNITY_MEMBER = (arg: any) => gql`
  	mutation AddCommunityMember($communityId: String!, $userId: String!) {
	addCommunityMember(communityId: $communityId, userId: $userId) {
		code
		success
		message
	}
}
`;


export const DELETE_COMMUNITY_MEMBER = (arg: any) => gql`
mutation DeleteCommunityMember($communityId: String!, $userId: String!) {
	deleteCommunityMember(communityId: $communityId, userId: $userId) {
		code
		success
		message
	}
}
`;
