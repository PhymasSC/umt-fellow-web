import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		name
		image
		email
	}
`;

export const THREAD_FRAGMENT = gql`
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

	query getUser($id: String, $email: String) {
		getUser(id: $id, email: $email) {
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
			community {
				id
				avatar
				name
				moderators {
				  id
				}
				admin {
				  id
				}
			  }
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

export const GET_THREADS_BY_COMMUNITY = gql`
	${THREAD_FRAGMENT}
	query GetThreadsByCommunity($communityId: String!) {
		getThreadsByCommunity(communityId: $communityId) {
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

export const GET_COMMUNITIES = gql`
query GetCommunities($userId: String) {
	getCommunities(userId: $userId) {
		id
		name
		description
		avatar
		banner
		creatorId {
			id 
		}
		isJoined
	}
}
`;

export const GET_COMMUNITY_BY_ID = (limit?: number) => gql`
${THREAD_FRAGMENT}
query GetCommunityById($id: String!) {
	getCommunityById(id: $id) {
	  id
	  name
	  description
	  avatar
	  banner
	  threads {
		...ThreadFragment
	  }
	  rules {
		id
		rule
		description
	  }
	  creatorId {
		  id
		  name
		  image
		}
		moderators {
			id
			name
			image
		}
		admin {
			id
			name
			image
		}
		members(limit: ${limit || 5}) {
			id
			name
			image
		}
	  created_at
	  updated_at
	}
  }
`;

export const GET_COMMUNITIES_OWNED_BY_USER = gql`
query ($userId: String!) {
	getCommunitiesOwnedByUser(userId: $userId) {
		id
		name
		description
		avatar
		banner
		isJoined
		created_at
		updated_at
	}
  }
`;

export const GET_COMMUNITIES_FOLLOWED_BY_USER = gql`
query ($userId: String!) {
	getCommunitiesFollowedByUser(userId: $userId) {
	  id
	  name
	  avatar
	  description
	  isJoined
	}
  }
`;

export const GET_COMMUNITY_MEMBERS = gql`
query GetCommunityMembers($communityId: String!, $role: [Role], $limit: Int, $offset: Int) {
    getCommunityMembers(communityId: $communityId, role: $role, limit: $limit, offset: $offset) {
      userId {
        id
        image
        name
      }
      role
      created_at
    }
  }
`;

export const GET_COMMUNITY_MEMBERS_BY_NAME = gql`
query GetCommunityMembersByName($communityId: String!, $name: String!, $role: [Role], $limit: Int, $offset: Int) {
	getCommunityMembersByName(communityId: $communityId, name: $name, role: $role, limit: $limit, offset: $offset) {
	  userId {
		id 
		image 
		name
	  }
	}
  }
`;

export const GET_COMMUNITY_MODERATORS = gql`
query GetCommunityModerators($communityId: String!) {
	getCommunityModerators(communityId: $communityId) {
	  userId {
		id
		image
		name
	  }
	  created_at
	}
  }
`;

export const GET_COMMUNITY_RULES = gql`
query GetCommunityRules($communityId: String!) {
	getCommunityRules(communityId: $communityId) {
	  id
	  rule
	  description
	}
  }
`;

export const GET_CHANNELS = gql`
query GetChannels($userId: String) {
	getChannels(userId: $userId) {
	  id
	  messages(limit: 1) {
		content
		user {
		  id
		}
	  }
	  participants {
		created_at
		user {
		  id
		  image
		  name
		}
	  }
	}
  }
`

export const GET_CHANNEL_PARTICIPANTS = gql`
${USER_FRAGMENT}
query GetChannelParticipants($channelId: String!, $limit: Int, $offset: Int) {
	getChannelParticipants(channelId: $channelId, limit: $limit, offset: $offset) {
	  user {
		...UserFragment
	  }
	}
  }
`;

export const GET_MESSAGES = gql`
query GetMessages($channelId: String!) {
	getMessages(channelId: $channelId) {
	  id
	  created_at
	  content
	  user {
		id
		name
		image
	  }
	}
  }
  `

const COMMENT_FRAGMENT = gql`
  fragment CommentsField on Comment {
	id
	user{
	  id
	  name
	  image
	}
	content
	created_at
	updated_at
  }
`

export const COMMENT_RECURSIVE_FRAGMENT = gql`
  ${COMMENT_FRAGMENT}
  fragment CommentsRecursive on Comment {
	...CommentsField
	replies {
	  ...CommentsField
	  replies{
		...CommentsField
		replies {
		  ...CommentsField
		}
	  }
	}
  }
`;

export const GET_COMMENTS = gql`
  ${COMMENT_RECURSIVE_FRAGMENT}

  query GetComments($threadId: String!) {
	getComments(threadId: $threadId) {
	  ...CommentsRecursive
	}
  }
`

export const GET_COMMENTS_BY_PARENT_ID = gql`
  ${COMMENT_RECURSIVE_FRAGMENT}
  
  query GetCommentsByParentId($parentId: String!){
	getCommentsByParentId(parentId: $parentId) {
	  ...CommentsRecursive
	}
  }
`

export const GET_FOLLOWERS = gql`
${USER_FRAGMENT}
query GetFollowers($userId: String!) {
	getFollowers(userId: $userId) {
		follower {
			...UserFragment
		}
		following {
			...UserFragment
		}
		created_at
		updated_at
	}
}
`

export const GET_FOLLOWING = gql`
${USER_FRAGMENT}
query GetFollowing($userId: String!) {
	getFollowing(userId: $userId) {
		follower {
			...UserFragment
		}
		following {
			...UserFragment
		}
		created_at
		updated_at
	}
}
`

export const GET_FOLLOW = gql`
${USER_FRAGMENT}
query GetFollow($followerId: String!, $followingId: String!) {
	getFollow(followerId: $followerId, followingId: $followingId) {
		follower {
			...UserFragment
		}
		following {
			...UserFragment
		}
		created_at
		updated_at
	}
}
`

// Comment Vote
export const GET_COMMENT_VOTES = gql`
query Query($commentId: String!) {
	getCommentUpvotesAndDownvotes(commentId: $commentId)
  }
`;