import { NextPage } from "next";
import { Profile as ProfileComponent } from "@components/index";
import { GET_THREADS_BY_AUTHOR, GET_USER } from "@operations/queries";
import { client } from "@lib/apollo-client";

const Profile: NextPage = (props) => {
  // @ts-expect-error
  const { userdata, threadData } = props;
  return (
    <>
      <ProfileComponent user={userdata?.getUser} threads={threadData} />
    </>
  );
};

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    const { data: userdata } = await client.query({
      query: GET_USER(`
      coverImage
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
      variables: { id },
    });
    const { data: threadData } = await client.query({
      query: GET_THREADS_BY_AUTHOR,
      variables: { authorId: id },
    });
    return {
      props: {
        userdata: userdata,
        threadData: threadData,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    notFound: true,
  };
}
export default Profile;
