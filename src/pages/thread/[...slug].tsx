import { NextPage } from "next";
import { useRouter } from "next/router";

const Feed: NextPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	return <>{slug}</>;
};

export default Feed;
