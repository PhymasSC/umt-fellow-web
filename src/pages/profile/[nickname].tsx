import { NextPage } from "next";
import { useRouter } from "next/router";
import { Profile as ProfileComponent } from "@components/index";

const Profile: NextPage = () => {
	const router = useRouter();
	const { nickname } = router.query;
	const mockData = {
		image: "https://picsum.photos/900/400",
		avatar: "https://picsum.photos/200/200",
		name: "Lau Sheng Cher",
		nickname,
		stats: [{ label: "string;", value: "string" }],
	};

	return (
		<>
			<ProfileComponent {...mockData}></ProfileComponent>
		</>
	);
};

export default Profile;
