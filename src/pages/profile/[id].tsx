import { NextPage } from "next";
import { Profile as ProfileComponent } from "@components/index";
import { GET_THREADS_BY_AUTHOR, GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

const Profile: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { loading: userLoading, data: userdata } = useQuery(
    GET_USER(`
			emailVerified
			isUMTMembership
			sex
			age
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
			updated_at`),
    {
      variables: { id },
    }
  );
  const { loading: threadLoading, data: threadData } = useQuery(
    GET_THREADS_BY_AUTHOR,
    {
      variables: { authorId: id },
    }
  );
  console.log(userdata, threadData);
  // const { userdata, threadData } = props;
  return (
    <>
      {userLoading || threadLoading ? (
        <div>Loading...</div>
      ) : (
        <ProfileComponent
          user={userdata?.getUser}
          threads={threadData}
        ></ProfileComponent>
      )}
    </>
  );
};

// export async function getServerSideProps(context: { params: { id: string } }) {
// 	const id = context.params.id;
// 	console.log(`id: ${id}`);
// 	try {
// 		const { data: userdata } = await client.query({
// 			query: GET_USER,
// 			variables: { id },
// 		});
// 		const { data: threadData } = await client.query({
// 			query: GET_THREADS_BY_AUTHOR,
// 			variables: { authorId: id },
// 		});
// 		console.log("ThreadData: ", threadData);
// 		console.log("User data: ", userdata);
// 		return {
// 			props: {
// 				userdata: userdata,
// 				threadData: threadData,
// 			},
// 		};
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	return {
// 		notFound: true,
// 	};
// }
export default Profile;
